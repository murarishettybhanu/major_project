const path = require('path')
const Post = require('../database/models/post')

var CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
var fs = require('fs');
var detectLang = require('lang-detector');
var defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;

module.exports = (req, res) => {
    const { image } = req.files
    //start

    // Configure API key authorization: Apikey
    var Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = "728f5cf7-3644-4e3e-a312-0fc8b20de366"
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Apikey.apiKeyPrefix['Apikey'] = "Token"

    var api = new CloudmersiveOcrApiClient.ImageOcrApi()

    // var pageBytes = fs.readFileSync("./gni.png"); // {File} Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.

    // console.log(pageBytes);

    var opts = {
        'language': "ENG", // {String} Optional, language of the input document, default is English (ENG).  Possible values are ENG (English), ARA (Arabic), ZHO (Chinese - Simplified), ZHO-HANT (Chinese - Traditional), ASM (Assamese), AFR (Afrikaans), AMH (Amharic), AZE (Azerbaijani), AZE-CYRL (Azerbaijani - Cyrillic), BEL (Belarusian), BEN (Bengali), BOD (Tibetan), BOS (Bosnian), BUL (Bulgarian), CAT (Catalan; Valencian), CEB (Cebuano), CES (Czech), CHR (Cherokee), CYM (Welsh), DAN (Danish), DEU (German), DZO (Dzongkha), ELL (Greek), ENM (Archaic/Middle English), EPO (Esperanto), EST (Estonian), EUS (Basque), FAS (Persian), FIN (Finnish), FRA (French), FRK (Frankish), FRM (Middle-French), GLE (Irish), GLG (Galician), GRC (Ancient Greek), HAT (Hatian), HEB (Hebrew), HIN (Hindi), HRV (Croatian), HUN (Hungarian), IKU (Inuktitut), IND (Indonesian), ISL (Icelandic), ITA (Italian), ITA-OLD (Old - Italian), JAV (Javanese), JPN (Japanese), KAN (Kannada), KAT (Georgian), KAT-OLD (Old-Georgian), KAZ (Kazakh), KHM (Central Khmer), KIR (Kirghiz), KOR (Korean), KUR (Kurdish), LAO (Lao), LAT (Latin), LAV (Latvian), LIT (Lithuanian), MAL (Malayalam), MAR (Marathi), MKD (Macedonian), MLT (Maltese), MSA (Malay), MYA (Burmese), NEP (Nepali), NLD (Dutch), NOR (Norwegian), ORI (Oriya), PAN (Panjabi), POL (Polish), POR (Portuguese), PUS (Pushto), RON (Romanian), RUS (Russian), SAN (Sanskrit), SIN (Sinhala), SLK (Slovak), SLV (Slovenian), SPA (Spanish), SPA-OLD (Old Spanish), SQI (Albanian), SRP (Serbian), SRP-LAT (Latin Serbian), SWA (Swahili), SWE (Swedish), SYR (Syriac), TAM (Tamil), TEL (Telugu), TGK (Tajik), TGL (Tagalog), THA (Thai), TIR (Tigrinya), TUR (Turkish), UIG (Uighur), UKR (Ukrainian), URD (Urdu), UZB (Uzbek), UZB-CYR (Cyrillic Uzbek), VIE (Vietnamese), YID (Yiddish)
        'preprocessing': "AUTO" // {String} Optional, preprocessing mode, default is 'Auto'.  Possible values are None (no preprocessing of the image), and Auto (automatic image enhancement of the image before OCR is applied; this is recommended).
    };

    var callback = function (error, data, response) {
        if (error) {
            console.error(error);
        } else {
            let a = '';
            for (i = 0; i < data.Lines.length; i++) {
                a = a + data.Lines[i].LineText + '\n'
            }

            if (req.session.userId) {
                image.mv(path.resolve(__dirname, '..', 'public/posts', image.name))
                Post.create({
                    image: `/posts/${image.name}`,
                    author: req.session.userId,
                    code: a,
                    language: detectLang(a)
                }, (error, post) => {
                    if (error) {
                        res.redirect("/");
                    }
                    else {
                        res.render("compiler", { code: a, lang: detectLang(a), post: post._id });
                    }
                });
            }
            else {
                res.render("compiler", { code: a, lang: detectLang(a) });
            }

            console.log(a);
            console.log(detectLang(a));
        }
    };
    api.imageOcrImageLinesWithLocation(image.data, opts, callback);

    //end
}