import jwt from "jsonwebtoken";
import config from "../configs/config.js";
import { isValidUsername } from "../utils/function.js";
import User from "../models/user.model.js";

class AuthService {
    async register(req, res) {
        try {
            //
            const { username, password } = req.body;

            if (username.length < 6) {
                throw "Tài khoản phải có độ dài lớn hơn 6 ký tự";
            }

            if (!isValidUsername(username)) {
                throw "Tài khoản không được chứa ký tự đặc biệt";
            }

            if (password.length == 0) {
                throw "Mật khẩu không được để trống";
            }

            //Lấy thông tin tài khoản
            const checkUser = await User.findOne({
                username,
            });

            //Nếu tồn tại
            if (checkUser) {
                throw "Tên đăng nhập đã tồn tại";
            }

            //insert User
            const user = new User({
                username,
                password,
            });
            await user.save();

            res.status(200).send({
                success: true,
                data: {
                    user: {
                        username: user.username,
                        _id: user._id,
                    },
                },
                alert: "success",
                message: "Đăng ký tài khoản thành công",
            });
        } catch (error) {
            res.status(200).send({
                success: false,
                alert: "error",
                message: `${error}`,
                error,
            });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (username.length < 6) {
                throw "Tài khoản hoặc mật khẩu không đúng";
            }

            if (password.length == 0) {
                throw "Tài khoản hoặc mật khẩu không đúng";
            }
            // xử lý login

            // xử lý login
            const user = await User.findOne({ username });

            if (!user || !(await user.comparePassword(password))) {
                throw CONSTANTS.ERROR_SYSTEM.ACCOUNT.PASSWORD_NOT_CORRECT;
            }

            const accessToken = jwt.sign(
                {
                    _id: user._id,
                    username: user.username,
                },
                config.api.accessTokenKey,
                {
                    expiresIn: "1d",
                }
            );

            const refreshToken = jwt.sign(
                { _id: user._id, username: user.username },
                config.api.refreshTokenKey,
                {
                    expiresIn: "2d",
                }
            );

            res.status(200).send({
                success: true,
                message: `Đăng nhập thành công`,
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        id: user._id,
                        username: user.username
                    },
                },
            });
        } catch (error) {
            res.status(200).send({
                success: false,
                alert: "error",
                message: `${error}`,
                error,
            });
        }
    }
}
export default AuthService;