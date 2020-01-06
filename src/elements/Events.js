import { getNestedComponents } from "../utilities/nestedComponentSetup";
import { getComponentString } from "../utilities/convert-to-react-component";


export function onExport() {
    let nestedComponents = getNestedComponents(this.state.elements[this.props.selectedIndex]);
    let uniqueComponents = [...new Set(nestedComponents.map(com=>com.name))].map(name=>{
        return this.state.elements.find(element=>element.name===name)
    })
    const removeParanthesis = (component)=>{
       return component.replace("(","").replace("})","}")
    }
    console.log(uniqueComponents.map(getComponentString).map(removeParanthesis).join(""));
}