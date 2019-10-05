const { v4: uuid } = require("uuid");

const mime = require("mime-types");
const multiparty = require("multiparty");
module.exports = ({ s3 }) => (req, res) => {
    let form = new multiparty.Form();

    form.on("part", async function(part) {
        if (part.name !== "data") {
            return;
        }

        const name = part.filename;
        const secret = uuid();
        const size = part.byteCount;
        const contentType = mime.lookup(part.filename);

        try {
            // Upload to S3
            const response = await s3
                .upload({
                    Key: secret,
                    ACL: "public-read",
                    Body: part,
                    ContentLength: size,
                    ContentType: contentType
                })
                .promise();
            const url = response.Location;
            console.log(response.Location);
            const file = {
                url
            };

            return res.status(200).send(file);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    form.on("error", err => {
        console.log(err);
        return res.sendStatus(500);
    });

    form.parse(req);
};
