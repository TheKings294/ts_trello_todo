// definie une valeur par défaut si aucune n'a été rempli
export function DefaultValue(defaultValue: string) {
    return function (target: any, key: string) {
        let value = target[key];

        Object.defineProperty(target, key, {
            get: () => value,
            set: (newValue) => value = newValue,
            enumerable: true,
            configurable: true
        });
    }
}

export function Required(target: any, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue: string) => {
            if (!newValue || newValue.length === 0) {
                throw new Error(`Property '${propertyKey}' is required`);
            }
            value = newValue;
        },
        enumerable: true,
        configurable: true,
    });
}