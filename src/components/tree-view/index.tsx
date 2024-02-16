import { BsPlusCircle, BsDashCircle, BsPlusCircleFill, BsDashCircleFill } from 'react-icons/bs'
import './style.scss'
import { useState } from 'react';


type MenuItem = {
    label: string,
    to: string,
    children: MenuItem[],
    isExpanded?: boolean
};


export default function TreeView({ menu }: { menu: MenuItem[] }) {

    let uniqueKey = 0;
    let getKey = () => ++uniqueKey;

    const [_, setMenus] = useState(menu);


    function handleToggle(menuItem: MenuItem) {
        menuItem.isExpanded = !menuItem.isExpanded;
        setMenus({ ...menu });
    }

    function handleToggleAll(menuItem: MenuItem | MenuItem[], isExpanded: boolean) {

        if (Array.isArray(menuItem)) {
            menuItem.forEach(m => handleToggleAll(m, isExpanded));
            setMenus({ ...menu });
        }
        else {
            menuItem.isExpanded = isExpanded;
            menuItem.children.forEach((item) => handleToggleAll(item, isExpanded));
        }

    }


    function drawItem(menuItem: MenuItem) {

        return (
            <div key={getKey()} className="menu-item">

                {
                    menuItem.children && menuItem.children.length > 0 ?
                        (menuItem.isExpanded ? <BsDashCircle style={{ cursor: 'pointer' }} onClick={() => handleToggle(menuItem)} />
                            : <BsPlusCircle style={{ cursor: 'pointer' }} onClick={() => handleToggle(menuItem)} />)
                        : <span className='blank-space'></span>
                }

                <span className="menu-item-label">{menuItem.label}</span>

                {
                    menuItem.children && menuItem.children.length > 0 && menuItem.isExpanded && (
                        <div className="menu-item-children">
                            {
                                menuItem.children.map((childItem) => {
                                    return drawItem(childItem)
                                })
                            }
                        </div>
                    )
                }

            </div>
        )
    }

    return (
        <>
            <div className='control-elements'>
                <BsPlusCircleFill className='control-elements-item' onClick={() => handleToggleAll(menu, true)} />
                <BsDashCircleFill className='control-elements-item' onClick={() => handleToggleAll(menu, false)} />
            </div>

            <div className="menu">
                {
                    menu.map((menuItem) => {
                        return drawItem(menuItem)
                    })
                }
            </div>
        </>
    )
}