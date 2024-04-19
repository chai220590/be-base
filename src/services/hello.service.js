
class HelloService {
    async sayHi(req, res) {
        res.status(200).send({
            success: true,
            message: "GM",
        });
    }
}
export default HelloService;