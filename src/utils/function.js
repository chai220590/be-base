export function isValidUsername(username) {
    // Sử dụng biểu thức chính quy để kiểm tra username không chứa ký tự đặc biệt
    const regex = /^[a-zA-Z0-9._]+$/; // Chấp nhận chữ cái, số và dấu gạch dưới

    // Kiểm tra xem username phù hợp với biểu thức chính quy không
    return regex.test(username);
}