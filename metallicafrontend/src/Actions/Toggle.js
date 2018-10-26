
export function Toggle(name, flag, disable, disableFields, data, Operation) {

    return {
        type: "Toggle_Component",
        heading: name,
        visible: flag,
        disable: disable,
        Data: data,
        disableFields: disableFields,
        Operation: Operation
    }
}