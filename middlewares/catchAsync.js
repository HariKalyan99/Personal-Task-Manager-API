const catchAsync = (fn) => {
    return (requet, response, next) => {
        fn(requet, response, next).catch(next)
    }
}

module.exports = catchAsync;