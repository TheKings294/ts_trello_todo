export function argsParser(argv: string[]): Record<string, string> {
    let args : Record<string, string> = {};

    argv.forEach((arg, i) => {
        if (arg.startsWith('--')) {
            const key : string = arg.slice(2)
            const value = argv[i + 1]

            if (typeof value === "undefined") {
                throw new Error(`Invalid argument "${arg}" for ${i + 1}.`);
            }

            args[key] = value;
        }
    })

    return args
}