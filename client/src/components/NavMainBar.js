import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";

const NavMainBar = observer(() => {
    const {globalStore} = useContext(Context)
    return (
        <ListGroup>
            {globalStore.tabs.map(tab =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={tab.id === globalStore.selectedTab.id}
                    onClick={() => globalStore.setSelectedTab(tab)}
                >{tab.name}</ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default NavMainBar;