  const {
    GoogleSpreadsheet
} = require("google-spreadsheet");

// Config variables
const SPREADSHEET_ID = "1cRA2f3R7MceKn0tY1s9p_3bVKJvwI_7c7JbBAA_RdG8";
const CLIENT_EMAIL = "statsrank@statsrank.iam.gserviceaccount.com";
const private_keys =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFwDVSmw6iEbB8\nx1bm+DQU2QfiuH4GCLhH1FYOFAU2X1ee5qnYI7bTwi0yTYYmWKQXXG1nBejbJKOe\nka06jVK1WxlgZVbcCJXq/QtAlHN2Gh5HFEg2rZAP1Mmm+FxgcU5elQjn4+9SOgWH\n6k1Rd0MyhVVjoKnYKLfdrOPlVc5713/vAHeigcOMH/ruRPtrAUQxpfd42ImqHCSK\noCumEld9/nYpktM3fsJyULEki3LSijU/MJnLoIHOy/QCI0vUfnYZ7n0cSwd1/vyb\nFHCk6PPop+GrjDTqEPNzOJiqRQHfToPtyHwvOtl3fgZMzI3EWpTUveslcncZi9IH\nVx+4ccvlAgMBAAECggEAAmkmvOStFJg/h1w7cYHPRIHt7bT4FolBMxA9ddcACg0Z\nYfST4qCwKqxxDptNm/LUkFQ655S4b/y+0zyac/f4oeqwsCdbc69W7mudsI4Mb7hE\nS/EuZQfnVRW3hcIrvhREvpkulilqVp/TmjHLr3h4FljHY3qRnSMMv1rep7NOe7Zt\nvLRw+B2FfGHgXSXFVYTXWM7EnqaLJcudhu3tH0FAmxXsm25agevnjw+Y7Ds5rgpw\n/yiqxEcO+1BKzxi0iv9fvw1BuNVaRrH2jm8P3Xxf6NbR0bdkHmvQ3XXObpJRv2Hv\n9fp/5vDdEpmqsSFsw+Dty97wI98ytnyKztgkSILt0QKBgQC8bNWIGxj1jAN/A0H8\nq65HxqwLBSq1OjZMN3ujumeBgBHyfR0zVxOCuOCuE+5nBBfoUl3ecC/rOO0UqJct\nHPQu9QEgwKGzj4Izd+lNvkEHxflc9ImadSamP/edgYPCs7dpAfu4DAer8fzQeamE\nVVjwkFAiJ/IZfYlXOzuqkKL3VQKBgQC1t8Rju4hQweNu9r1S4U+n602zlKOiMWz0\nN7zfpxpQa1xaovyLt16hF9bZVE5lap7vxKPvwtpYaiRpsfdB8bFziJ4XJppnjqoG\ni6fm6drR65XVDk12JIbD5xgLYqxDn5p/jSf6DzRCLAB4PTIfGA9ProQ2lUtb/4l8\ngF/p02diUQKBgGOxpc0MoUkR2quyGpDIeT6qxE5UXoNimGX9GSLItokTLOvC/Nc0\nJDOPA/m2u/WvecLHCbluXDw1c2LxzILnBd9ubDlbEnNB4969fChRGHE3czeWftPF\nVjyyLZ4db4xtsAYUMY3wd4KnV18qb+F/kr49bNiVkAeiny8TPP+C5Wa9AoGARI2z\nVTymTHEY7/+9pMrDVkH66kilAsdKp0dvxaAw2S3nhXn/dGYVGQj5ULvxZ2k11JaG\nkikcXkaMviMZeJNJsqBTo8A4d+DmW9nL2d1XY+JQgDQJHQzimn1QINt0yX4otv31\nmuypdl1LQBE2G2zkOddIoZ7o8ygQIhv8EyZh1kECgYEAgTXuGTG74x8dXRLJu/Po\ntTV+qzJRa9GOjx761zK1FZuQpb29tTrT0rcAbf0jrzC2CSVN3P1s/sy9zi3Vq3U3\nqUGRx6KQMjhUhNRLDA/sZp8e2y0rYImpN61HzGw07OKiL2Q8kz10GTDnmSm0Vjzo\nIpDk0eKGepDLDEioJMxehjs=\n-----END PRIVATE KEY-----\n";
// use service account creds
const PRIVATE_KEY = private_keys.replace(/\\n/g, "\n");

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export const appendSpreadsheet = async (count) => {
    try {
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[count];
        const rows = await sheet.getRows();
        let array = Object.keys(rows).map((d) => {
            return rows[d]._rawData;
        });
        return array;
    } catch (e) {
        console.error("Error: ", e);
    }
};
export const addRow = async (count, value) => {
    try {
        console.log(value)
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[count];
        const larryRow = await sheet.addRow({
            PLAYER_NAME: value[0],
            TEAM_NAME: value[1],
            POINTS: value[2],
            CHALLENGE:value[3]
        });
        return larryRow._rawData
    } catch (e) {
        console.error("Error: ", e);
    }
}