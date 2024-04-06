export const validateEmail = (error, data, next) => {
    const { name, code } = error;

    console.log(name, code)

    next()
}
