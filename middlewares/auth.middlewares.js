import config from "../config/config";
import AppError from "./appError";

const authentication = catchAsync(async (request, _, next) => {
    let idToken = "";
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      idToken = request.headers.authorization.split(" ")[1];
    }
  
    if (!idToken) {
      return next(new AppError("Please log in get access", 401));
    }
  
    const tokenDetail = jwt.verify(idToken, config.JWT_SECRET);
  
    const userExist = await user.findByPk(tokenDetail.id);
  
    if (!userExist) {
      return next(new AppError("User no longer exists", 400));
    }
    request.user = userExist;
    return next();
  });



  export default authentication;