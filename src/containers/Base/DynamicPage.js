import React, {Component} from "react";

export default
class DynamicPage extends Component {

    componentDidMount() {
        let $ = window.$;
        try {
            $.AdminLTE.layout.activate();
        }catch(e){}
    }

}
