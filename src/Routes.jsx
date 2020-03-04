import React from 'react';
import { Switch, Route } from "react-router";
import AddMentorForm from "./components/AddMentorForm";
import ListMentorForm from "./components/ListMentorForm";
import EditMentorForm from "./components/EditMentorForm";

const RoutesPath = () => {
    return (
        <Switch>
            <Route path="/" exact  component={ListMentorForm} />
            <Route path="/addMentor" exact  component={AddMentorForm} />
            <Route path="/editmentor"  component={EditMentorForm} />
        </Switch>
    )
}
export default RoutesPath;