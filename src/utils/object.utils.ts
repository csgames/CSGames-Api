export namespace ObjectUtils {
    export function rebuildObjectIfBroken(value: any): Object {
        if (!(value instanceof Object)) {
            let newRealOPObject = {};
            for (let key in value) {
                if (key in value) {
                    if (value[key] === 'true') {
                        newRealOPObject[key] = true;
                    } else if (value[key] === 'false') {
                        newRealOPObject[key] = false;
                    } else {
                        newRealOPObject[key] = value[key];
                    }
                }
            }
            return newRealOPObject;
        }
        return value;
    }

    export function forEachProperty(
        object: Object,
        valueHandle: (value: any) => any,
        objectHandle?: (object: Object) => void
    ) {
        for (let property in object) {
            if (!object.hasOwnProperty || object.hasOwnProperty(property)) {
                let value = object[property];
                if (value instanceof Array) {
                    for (let i = 0; i < value.length; ++i) {
                        value[i] = valueHandle(value[i]);
                    }
                } else if (objectHandle && value instanceof Object) {
                    objectHandle(object[property]);
                } else {
                    object[property] = valueHandle(object[property]);
                }
            }
        }
    }

    export function objectToArrayOfProperties(object: Object, deep = false): any[] {
        // Convert object properties to array.
        let properties: any[] = [];
        forEachProperty(
            object,
            value => {
                properties.push(value);
                return value;
            },
            !deep
                ? null
                : deepObject => {
                    properties.push(objectToArrayOfProperties(deepObject));
                }
        );
        return properties;
    }
}
