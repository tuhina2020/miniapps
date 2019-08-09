import ZodiacMulti from "@/astro/zodiacMulti";
import * as utils from "@/utils";
import styles from "./index.css";
class AstroAppContainer {
  constructor() {
    this.state = {};
    this.getZodiacs();
  }

  getZodiacs() {
    // API call to get zodiac data
    // const headers = Android.get("userInfo").replace(
    //   new RegExp("\n", "g"),
    //   "\\n"
    // );
    const headers = "lol";
    const requestObj = {
      url:
        "https://apis.sharechat.com/miniapp-service/v1.0.0/miniapps/274bd6ea-9fa6-4b77-8a0c-665b816c4a8b/meta",
      headers: { Authorization: headers }
    };

    utils
      .request(requestObj)
      .then(res => {
        console.log(res, "this is it");
        this.state = res;
        this.render();
        this.events();
        return Promise.resolve();
      })
      .catch(() => {
        this.state = {
          DailyHoroscope: {
            id: 101070819,
            lang: "hindi",
            StartDate: "8/7/2019 12:00:00 AM",
            EndDate: "8/7/2019 11:59:00 PM",
            contentItem: [
              {
                Sunsign: "मेष",
                icon: "http://api.astroyogi.com/images/signicon/home-aries.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपको अपने कार्यालय और घर पर नाजुक मुद्दों को सुलझाने के लिए अपनी चतुराई और समझ का इस्तेमाल करना होगा। ध्यान रहे कि औरों को बहस करते देख कर आप भी शुरू ना हो जाएं। अगर कोई आपके साथ गलत व्यवहार करे भी तो आप नम्रता से अपनी बात कहें और फिर वहां से निकल लें। सब कुछ ठीक हो जाएगा।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "आज रोमांस के मामले में आपका अवसरों से भरा दिन है। आप के आस-पास का कोई व्यक्ति, जिसे आप नहीं जानते, पर वह आपसे आकर्षित है, आपकी उससे मुलाकात होगी।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आपका अपने विरोधियों के साथ झगड़ा चल रहा है तो ध्यान रहे कि वे अपने कौशल से आपको हराने की पूरी कोशिश कर रहे हैं। इसलिए, आप अपना सारा काम ध्यान से पूरा करें और अपने विरोधियों को खुद पर हावी ना होने दें। आज आपको उनसे आगे निकलना ही है। ये चुपचाप बैठे रहने की घड़ी नहीं है।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "यदि आपने किसी कर्ज के लिए आवेदन कर रखा है तो आज उधर से अच्छी खबर मिल सकती है। इसमें देर लगी पर आपके सब्र का मीठा फल निकला। इस रकम को समझदारी से खर्च करें। और जो मदद आपको मिल रही है उसे अनाप शनाप गंवाना भी ठीक नहीं। हां कर्ज उतना ही ठीक जितना आप आसानी से चुका सकें।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "अगर आपको हाई और लो बल्डप्रेशर की शिकायत है तो आज आपको अपनी सेहत का खयाल रखना होगा। अपनी स्थिति की बेहतरी के लिए जीवनशैली में बदलाव लाएं। किसी भी सकारात्मक सुधार को एक चिन्ह मान लिजिए जो आपको सही रास्ता दिखा रहा है। आज हल्की-फुल्की कसरत कीजिए।"
                  }
                ]
              },
              {
                Sunsign: "वृषभ",
                icon:
                  "http://api.astroyogi.com/images/signicon/home-taurus.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपके सरकार से संबंधित अटके हुए काम बन जाएंगे। उन संस्थानों से आपके काम को प्राथमिकता मिलेगी जहां अब तक आपके काम पर ध्यान नहीं दिया जाता था। इस अच्छे समय का लाभ उठाते हुए आप अपना सारा काम समय पर पूरा कर लें।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "जिनके पार्टनर दूर रहते हैं, आज उनकी आश्चर्यजनक रूप से मुलाकात हो सकती है। कहीं बाहर के लिए अच्छी योजना बनाएं, आपको आज पता भी नहीं चलेगा कि आपका दिन कैसे बीत गया।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आप व्यवसाय करते हैं तो आज आप पाएंगे कि आप अपने सहकर्मियों और प्रतिस्पर्धियों से आगे निकल गए हैं। आज आपका करिश्माई व्यक्तित्व अपने चरम पर है और लोग आपसे प्रभावित होंगे। इस समय का उपयोग अपने बॉस को प्रभावित करने के लिए करें और खुद को प्रमोशन की लाइन में सबसे आगे रखने की कोशिश करें।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "कुछ दिनों से आप दान की सोच रहे थे आज का दिन अच्छा है, दान कर डालिए। मौका भी है और दस्तूर भी। दान करने से आपको खुशी और मन की शांति मिलेगी। आप परंपरागत निवेश का भी नतीजा भुगत चुके हैं और शेयर में भी पैसा डुबो चुके हैं। अब आप पैसे को सही दिशा में निवेश करना चाह रहे हैं। यह सही मौका है सही दिशा में निवेश का। नेक कामों के लिए कुछ दान भी कीजिए।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "आज आप तनाव को काबू में रखने की कोशिश करें। आप पाएंगे कि बल्डप्रेशर बढ़ने का कारण टैन्शन है। और यह वही समय है जब आप बल्डप्रेशर को बढ़ने से रोक सकते हैं। बढ़ता तनाव आपकी सेहत और जिन्दगी को प्रभावित कर सकता है जिसे आप देख नही पा रहे हैं। इसलिए कुछ समय निकाल कर ध्यान में बैठें ताकि आप अपने दिमाग को ठन्डा कर सकें और पाचन क्रिया को मजबूत करें।"
                  }
                ]
              },
              {
                Sunsign: "मेष",
                icon: "http://api.astroyogi.com/images/signicon/home-aries.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपको अपने कार्यालय और घर पर नाजुक मुद्दों को सुलझाने के लिए अपनी चतुराई और समझ का इस्तेमाल करना होगा। ध्यान रहे कि औरों को बहस करते देख कर आप भी शुरू ना हो जाएं। अगर कोई आपके साथ गलत व्यवहार करे भी तो आप नम्रता से अपनी बात कहें और फिर वहां से निकल लें। सब कुछ ठीक हो जाएगा।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "आज रोमांस के मामले में आपका अवसरों से भरा दिन है। आप के आस-पास का कोई व्यक्ति, जिसे आप नहीं जानते, पर वह आपसे आकर्षित है, आपकी उससे मुलाकात होगी।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आपका अपने विरोधियों के साथ झगड़ा चल रहा है तो ध्यान रहे कि वे अपने कौशल से आपको हराने की पूरी कोशिश कर रहे हैं। इसलिए, आप अपना सारा काम ध्यान से पूरा करें और अपने विरोधियों को खुद पर हावी ना होने दें। आज आपको उनसे आगे निकलना ही है। ये चुपचाप बैठे रहने की घड़ी नहीं है।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "यदि आपने किसी कर्ज के लिए आवेदन कर रखा है तो आज उधर से अच्छी खबर मिल सकती है। इसमें देर लगी पर आपके सब्र का मीठा फल निकला। इस रकम को समझदारी से खर्च करें। और जो मदद आपको मिल रही है उसे अनाप शनाप गंवाना भी ठीक नहीं। हां कर्ज उतना ही ठीक जितना आप आसानी से चुका सकें।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "अगर आपको हाई और लो बल्डप्रेशर की शिकायत है तो आज आपको अपनी सेहत का खयाल रखना होगा। अपनी स्थिति की बेहतरी के लिए जीवनशैली में बदलाव लाएं। किसी भी सकारात्मक सुधार को एक चिन्ह मान लिजिए जो आपको सही रास्ता दिखा रहा है। आज हल्की-फुल्की कसरत कीजिए।"
                  }
                ]
              },
              {
                Sunsign: "वृषभ",
                icon:
                  "http://api.astroyogi.com/images/signicon/home-taurus.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपके सरकार से संबंधित अटके हुए काम बन जाएंगे। उन संस्थानों से आपके काम को प्राथमिकता मिलेगी जहां अब तक आपके काम पर ध्यान नहीं दिया जाता था। इस अच्छे समय का लाभ उठाते हुए आप अपना सारा काम समय पर पूरा कर लें।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "जिनके पार्टनर दूर रहते हैं, आज उनकी आश्चर्यजनक रूप से मुलाकात हो सकती है। कहीं बाहर के लिए अच्छी योजना बनाएं, आपको आज पता भी नहीं चलेगा कि आपका दिन कैसे बीत गया।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आप व्यवसाय करते हैं तो आज आप पाएंगे कि आप अपने सहकर्मियों और प्रतिस्पर्धियों से आगे निकल गए हैं। आज आपका करिश्माई व्यक्तित्व अपने चरम पर है और लोग आपसे प्रभावित होंगे। इस समय का उपयोग अपने बॉस को प्रभावित करने के लिए करें और खुद को प्रमोशन की लाइन में सबसे आगे रखने की कोशिश करें।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "कुछ दिनों से आप दान की सोच रहे थे आज का दिन अच्छा है, दान कर डालिए। मौका भी है और दस्तूर भी। दान करने से आपको खुशी और मन की शांति मिलेगी। आप परंपरागत निवेश का भी नतीजा भुगत चुके हैं और शेयर में भी पैसा डुबो चुके हैं। अब आप पैसे को सही दिशा में निवेश करना चाह रहे हैं। यह सही मौका है सही दिशा में निवेश का। नेक कामों के लिए कुछ दान भी कीजिए।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "आज आप तनाव को काबू में रखने की कोशिश करें। आप पाएंगे कि बल्डप्रेशर बढ़ने का कारण टैन्शन है। और यह वही समय है जब आप बल्डप्रेशर को बढ़ने से रोक सकते हैं। बढ़ता तनाव आपकी सेहत और जिन्दगी को प्रभावित कर सकता है जिसे आप देख नही पा रहे हैं। इसलिए कुछ समय निकाल कर ध्यान में बैठें ताकि आप अपने दिमाग को ठन्डा कर सकें और पाचन क्रिया को मजबूत करें।"
                  }
                ]
              },
              {
                Sunsign: "मेष",
                icon: "http://api.astroyogi.com/images/signicon/home-aries.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपको अपने कार्यालय और घर पर नाजुक मुद्दों को सुलझाने के लिए अपनी चतुराई और समझ का इस्तेमाल करना होगा। ध्यान रहे कि औरों को बहस करते देख कर आप भी शुरू ना हो जाएं। अगर कोई आपके साथ गलत व्यवहार करे भी तो आप नम्रता से अपनी बात कहें और फिर वहां से निकल लें। सब कुछ ठीक हो जाएगा।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "आज रोमांस के मामले में आपका अवसरों से भरा दिन है। आप के आस-पास का कोई व्यक्ति, जिसे आप नहीं जानते, पर वह आपसे आकर्षित है, आपकी उससे मुलाकात होगी।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आपका अपने विरोधियों के साथ झगड़ा चल रहा है तो ध्यान रहे कि वे अपने कौशल से आपको हराने की पूरी कोशिश कर रहे हैं। इसलिए, आप अपना सारा काम ध्यान से पूरा करें और अपने विरोधियों को खुद पर हावी ना होने दें। आज आपको उनसे आगे निकलना ही है। ये चुपचाप बैठे रहने की घड़ी नहीं है।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "यदि आपने किसी कर्ज के लिए आवेदन कर रखा है तो आज उधर से अच्छी खबर मिल सकती है। इसमें देर लगी पर आपके सब्र का मीठा फल निकला। इस रकम को समझदारी से खर्च करें। और जो मदद आपको मिल रही है उसे अनाप शनाप गंवाना भी ठीक नहीं। हां कर्ज उतना ही ठीक जितना आप आसानी से चुका सकें।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "अगर आपको हाई और लो बल्डप्रेशर की शिकायत है तो आज आपको अपनी सेहत का खयाल रखना होगा। अपनी स्थिति की बेहतरी के लिए जीवनशैली में बदलाव लाएं। किसी भी सकारात्मक सुधार को एक चिन्ह मान लिजिए जो आपको सही रास्ता दिखा रहा है। आज हल्की-फुल्की कसरत कीजिए।"
                  }
                ]
              },
              {
                Sunsign: "वृषभ",
                icon:
                  "http://api.astroyogi.com/images/signicon/home-taurus.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपके सरकार से संबंधित अटके हुए काम बन जाएंगे। उन संस्थानों से आपके काम को प्राथमिकता मिलेगी जहां अब तक आपके काम पर ध्यान नहीं दिया जाता था। इस अच्छे समय का लाभ उठाते हुए आप अपना सारा काम समय पर पूरा कर लें।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "जिनके पार्टनर दूर रहते हैं, आज उनकी आश्चर्यजनक रूप से मुलाकात हो सकती है। कहीं बाहर के लिए अच्छी योजना बनाएं, आपको आज पता भी नहीं चलेगा कि आपका दिन कैसे बीत गया।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आप व्यवसाय करते हैं तो आज आप पाएंगे कि आप अपने सहकर्मियों और प्रतिस्पर्धियों से आगे निकल गए हैं। आज आपका करिश्माई व्यक्तित्व अपने चरम पर है और लोग आपसे प्रभावित होंगे। इस समय का उपयोग अपने बॉस को प्रभावित करने के लिए करें और खुद को प्रमोशन की लाइन में सबसे आगे रखने की कोशिश करें।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "कुछ दिनों से आप दान की सोच रहे थे आज का दिन अच्छा है, दान कर डालिए। मौका भी है और दस्तूर भी। दान करने से आपको खुशी और मन की शांति मिलेगी। आप परंपरागत निवेश का भी नतीजा भुगत चुके हैं और शेयर में भी पैसा डुबो चुके हैं। अब आप पैसे को सही दिशा में निवेश करना चाह रहे हैं। यह सही मौका है सही दिशा में निवेश का। नेक कामों के लिए कुछ दान भी कीजिए।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "आज आप तनाव को काबू में रखने की कोशिश करें। आप पाएंगे कि बल्डप्रेशर बढ़ने का कारण टैन्शन है। और यह वही समय है जब आप बल्डप्रेशर को बढ़ने से रोक सकते हैं। बढ़ता तनाव आपकी सेहत और जिन्दगी को प्रभावित कर सकता है जिसे आप देख नही पा रहे हैं। इसलिए कुछ समय निकाल कर ध्यान में बैठें ताकि आप अपने दिमाग को ठन्डा कर सकें और पाचन क्रिया को मजबूत करें।"
                  }
                ]
              },
              {
                Sunsign: "मेष",
                icon: "http://api.astroyogi.com/images/signicon/home-aries.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपको अपने कार्यालय और घर पर नाजुक मुद्दों को सुलझाने के लिए अपनी चतुराई और समझ का इस्तेमाल करना होगा। ध्यान रहे कि औरों को बहस करते देख कर आप भी शुरू ना हो जाएं। अगर कोई आपके साथ गलत व्यवहार करे भी तो आप नम्रता से अपनी बात कहें और फिर वहां से निकल लें। सब कुछ ठीक हो जाएगा।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "आज रोमांस के मामले में आपका अवसरों से भरा दिन है। आप के आस-पास का कोई व्यक्ति, जिसे आप नहीं जानते, पर वह आपसे आकर्षित है, आपकी उससे मुलाकात होगी।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आपका अपने विरोधियों के साथ झगड़ा चल रहा है तो ध्यान रहे कि वे अपने कौशल से आपको हराने की पूरी कोशिश कर रहे हैं। इसलिए, आप अपना सारा काम ध्यान से पूरा करें और अपने विरोधियों को खुद पर हावी ना होने दें। आज आपको उनसे आगे निकलना ही है। ये चुपचाप बैठे रहने की घड़ी नहीं है।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "यदि आपने किसी कर्ज के लिए आवेदन कर रखा है तो आज उधर से अच्छी खबर मिल सकती है। इसमें देर लगी पर आपके सब्र का मीठा फल निकला। इस रकम को समझदारी से खर्च करें। और जो मदद आपको मिल रही है उसे अनाप शनाप गंवाना भी ठीक नहीं। हां कर्ज उतना ही ठीक जितना आप आसानी से चुका सकें।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "अगर आपको हाई और लो बल्डप्रेशर की शिकायत है तो आज आपको अपनी सेहत का खयाल रखना होगा। अपनी स्थिति की बेहतरी के लिए जीवनशैली में बदलाव लाएं। किसी भी सकारात्मक सुधार को एक चिन्ह मान लिजिए जो आपको सही रास्ता दिखा रहा है। आज हल्की-फुल्की कसरत कीजिए।"
                  }
                ]
              },
              {
                Sunsign: "वृषभ",
                icon:
                  "http://api.astroyogi.com/images/signicon/home-taurus.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपके सरकार से संबंधित अटके हुए काम बन जाएंगे। उन संस्थानों से आपके काम को प्राथमिकता मिलेगी जहां अब तक आपके काम पर ध्यान नहीं दिया जाता था। इस अच्छे समय का लाभ उठाते हुए आप अपना सारा काम समय पर पूरा कर लें।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "जिनके पार्टनर दूर रहते हैं, आज उनकी आश्चर्यजनक रूप से मुलाकात हो सकती है। कहीं बाहर के लिए अच्छी योजना बनाएं, आपको आज पता भी नहीं चलेगा कि आपका दिन कैसे बीत गया।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आप व्यवसाय करते हैं तो आज आप पाएंगे कि आप अपने सहकर्मियों और प्रतिस्पर्धियों से आगे निकल गए हैं। आज आपका करिश्माई व्यक्तित्व अपने चरम पर है और लोग आपसे प्रभावित होंगे। इस समय का उपयोग अपने बॉस को प्रभावित करने के लिए करें और खुद को प्रमोशन की लाइन में सबसे आगे रखने की कोशिश करें।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "कुछ दिनों से आप दान की सोच रहे थे आज का दिन अच्छा है, दान कर डालिए। मौका भी है और दस्तूर भी। दान करने से आपको खुशी और मन की शांति मिलेगी। आप परंपरागत निवेश का भी नतीजा भुगत चुके हैं और शेयर में भी पैसा डुबो चुके हैं। अब आप पैसे को सही दिशा में निवेश करना चाह रहे हैं। यह सही मौका है सही दिशा में निवेश का। नेक कामों के लिए कुछ दान भी कीजिए।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "आज आप तनाव को काबू में रखने की कोशिश करें। आप पाएंगे कि बल्डप्रेशर बढ़ने का कारण टैन्शन है। और यह वही समय है जब आप बल्डप्रेशर को बढ़ने से रोक सकते हैं। बढ़ता तनाव आपकी सेहत और जिन्दगी को प्रभावित कर सकता है जिसे आप देख नही पा रहे हैं। इसलिए कुछ समय निकाल कर ध्यान में बैठें ताकि आप अपने दिमाग को ठन्डा कर सकें और पाचन क्रिया को मजबूत करें।"
                  }
                ]
              },
              {
                Sunsign: "मेष",
                icon: "http://api.astroyogi.com/images/signicon/home-aries.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपको अपने कार्यालय और घर पर नाजुक मुद्दों को सुलझाने के लिए अपनी चतुराई और समझ का इस्तेमाल करना होगा। ध्यान रहे कि औरों को बहस करते देख कर आप भी शुरू ना हो जाएं। अगर कोई आपके साथ गलत व्यवहार करे भी तो आप नम्रता से अपनी बात कहें और फिर वहां से निकल लें। सब कुछ ठीक हो जाएगा।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "आज रोमांस के मामले में आपका अवसरों से भरा दिन है। आप के आस-पास का कोई व्यक्ति, जिसे आप नहीं जानते, पर वह आपसे आकर्षित है, आपकी उससे मुलाकात होगी।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आपका अपने विरोधियों के साथ झगड़ा चल रहा है तो ध्यान रहे कि वे अपने कौशल से आपको हराने की पूरी कोशिश कर रहे हैं। इसलिए, आप अपना सारा काम ध्यान से पूरा करें और अपने विरोधियों को खुद पर हावी ना होने दें। आज आपको उनसे आगे निकलना ही है। ये चुपचाप बैठे रहने की घड़ी नहीं है।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "यदि आपने किसी कर्ज के लिए आवेदन कर रखा है तो आज उधर से अच्छी खबर मिल सकती है। इसमें देर लगी पर आपके सब्र का मीठा फल निकला। इस रकम को समझदारी से खर्च करें। और जो मदद आपको मिल रही है उसे अनाप शनाप गंवाना भी ठीक नहीं। हां कर्ज उतना ही ठीक जितना आप आसानी से चुका सकें।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "अगर आपको हाई और लो बल्डप्रेशर की शिकायत है तो आज आपको अपनी सेहत का खयाल रखना होगा। अपनी स्थिति की बेहतरी के लिए जीवनशैली में बदलाव लाएं। किसी भी सकारात्मक सुधार को एक चिन्ह मान लिजिए जो आपको सही रास्ता दिखा रहा है। आज हल्की-फुल्की कसरत कीजिए।"
                  }
                ]
              },
              {
                Sunsign: "वृषभ",
                icon:
                  "http://api.astroyogi.com/images/signicon/home-taurus.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपके सरकार से संबंधित अटके हुए काम बन जाएंगे। उन संस्थानों से आपके काम को प्राथमिकता मिलेगी जहां अब तक आपके काम पर ध्यान नहीं दिया जाता था। इस अच्छे समय का लाभ उठाते हुए आप अपना सारा काम समय पर पूरा कर लें।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "जिनके पार्टनर दूर रहते हैं, आज उनकी आश्चर्यजनक रूप से मुलाकात हो सकती है। कहीं बाहर के लिए अच्छी योजना बनाएं, आपको आज पता भी नहीं चलेगा कि आपका दिन कैसे बीत गया।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आप व्यवसाय करते हैं तो आज आप पाएंगे कि आप अपने सहकर्मियों और प्रतिस्पर्धियों से आगे निकल गए हैं। आज आपका करिश्माई व्यक्तित्व अपने चरम पर है और लोग आपसे प्रभावित होंगे। इस समय का उपयोग अपने बॉस को प्रभावित करने के लिए करें और खुद को प्रमोशन की लाइन में सबसे आगे रखने की कोशिश करें।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "कुछ दिनों से आप दान की सोच रहे थे आज का दिन अच्छा है, दान कर डालिए। मौका भी है और दस्तूर भी। दान करने से आपको खुशी और मन की शांति मिलेगी। आप परंपरागत निवेश का भी नतीजा भुगत चुके हैं और शेयर में भी पैसा डुबो चुके हैं। अब आप पैसे को सही दिशा में निवेश करना चाह रहे हैं। यह सही मौका है सही दिशा में निवेश का। नेक कामों के लिए कुछ दान भी कीजिए।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "आज आप तनाव को काबू में रखने की कोशिश करें। आप पाएंगे कि बल्डप्रेशर बढ़ने का कारण टैन्शन है। और यह वही समय है जब आप बल्डप्रेशर को बढ़ने से रोक सकते हैं। बढ़ता तनाव आपकी सेहत और जिन्दगी को प्रभावित कर सकता है जिसे आप देख नही पा रहे हैं। इसलिए कुछ समय निकाल कर ध्यान में बैठें ताकि आप अपने दिमाग को ठन्डा कर सकें और पाचन क्रिया को मजबूत करें।"
                  }
                ]
              },
              {
                Sunsign: "मेष",
                icon: "http://api.astroyogi.com/images/signicon/home-aries.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपको अपने कार्यालय और घर पर नाजुक मुद्दों को सुलझाने के लिए अपनी चतुराई और समझ का इस्तेमाल करना होगा। ध्यान रहे कि औरों को बहस करते देख कर आप भी शुरू ना हो जाएं। अगर कोई आपके साथ गलत व्यवहार करे भी तो आप नम्रता से अपनी बात कहें और फिर वहां से निकल लें। सब कुछ ठीक हो जाएगा।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "आज रोमांस के मामले में आपका अवसरों से भरा दिन है। आप के आस-पास का कोई व्यक्ति, जिसे आप नहीं जानते, पर वह आपसे आकर्षित है, आपकी उससे मुलाकात होगी।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आपका अपने विरोधियों के साथ झगड़ा चल रहा है तो ध्यान रहे कि वे अपने कौशल से आपको हराने की पूरी कोशिश कर रहे हैं। इसलिए, आप अपना सारा काम ध्यान से पूरा करें और अपने विरोधियों को खुद पर हावी ना होने दें। आज आपको उनसे आगे निकलना ही है। ये चुपचाप बैठे रहने की घड़ी नहीं है।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "यदि आपने किसी कर्ज के लिए आवेदन कर रखा है तो आज उधर से अच्छी खबर मिल सकती है। इसमें देर लगी पर आपके सब्र का मीठा फल निकला। इस रकम को समझदारी से खर्च करें। और जो मदद आपको मिल रही है उसे अनाप शनाप गंवाना भी ठीक नहीं। हां कर्ज उतना ही ठीक जितना आप आसानी से चुका सकें।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "अगर आपको हाई और लो बल्डप्रेशर की शिकायत है तो आज आपको अपनी सेहत का खयाल रखना होगा। अपनी स्थिति की बेहतरी के लिए जीवनशैली में बदलाव लाएं। किसी भी सकारात्मक सुधार को एक चिन्ह मान लिजिए जो आपको सही रास्ता दिखा रहा है। आज हल्की-फुल्की कसरत कीजिए।"
                  }
                ]
              },
              {
                Sunsign: "वृषभ",
                icon:
                  "http://api.astroyogi.com/images/signicon/home-taurus.png",
                categories: [
                  {
                    category_name: "दैनिक राशिफल",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Overview.jpg",
                    description:
                      "आज आपके सरकार से संबंधित अटके हुए काम बन जाएंगे। उन संस्थानों से आपके काम को प्राथमिकता मिलेगी जहां अब तक आपके काम पर ध्यान नहीं दिया जाता था। इस अच्छे समय का लाभ उठाते हुए आप अपना सारा काम समय पर पूरा कर लें।"
                  },
                  {
                    category_name: "प्रेम",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Love.jpg",
                    description:
                      "जिनके पार्टनर दूर रहते हैं, आज उनकी आश्चर्यजनक रूप से मुलाकात हो सकती है। कहीं बाहर के लिए अच्छी योजना बनाएं, आपको आज पता भी नहीं चलेगा कि आपका दिन कैसे बीत गया।"
                  },
                  {
                    category_name: "करियर",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Career.jpg",
                    description:
                      "अगर आप व्यवसाय करते हैं तो आज आप पाएंगे कि आप अपने सहकर्मियों और प्रतिस्पर्धियों से आगे निकल गए हैं। आज आपका करिश्माई व्यक्तित्व अपने चरम पर है और लोग आपसे प्रभावित होंगे। इस समय का उपयोग अपने बॉस को प्रभावित करने के लिए करें और खुद को प्रमोशन की लाइन में सबसे आगे रखने की कोशिश करें।"
                  },
                  {
                    category_name: "वित्त",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Finance.jpg",
                    description:
                      "कुछ दिनों से आप दान की सोच रहे थे आज का दिन अच्छा है, दान कर डालिए। मौका भी है और दस्तूर भी। दान करने से आपको खुशी और मन की शांति मिलेगी। आप परंपरागत निवेश का भी नतीजा भुगत चुके हैं और शेयर में भी पैसा डुबो चुके हैं। अब आप पैसे को सही दिशा में निवेश करना चाह रहे हैं। यह सही मौका है सही दिशा में निवेश का। नेक कामों के लिए कुछ दान भी कीजिए।"
                  },
                  {
                    category_name: "स्वास्थ्य ",
                    category_image:
                      "http://api.astroyogi.com/helpchat/images/Health.jpg",
                    description:
                      "आज आप तनाव को काबू में रखने की कोशिश करें। आप पाएंगे कि बल्डप्रेशर बढ़ने का कारण टैन्शन है। और यह वही समय है जब आप बल्डप्रेशर को बढ़ने से रोक सकते हैं। बढ़ता तनाव आपकी सेहत और जिन्दगी को प्रभावित कर सकता है जिसे आप देख नही पा रहे हैं। इसलिए कुछ समय निकाल कर ध्यान में बैठें ताकि आप अपने दिमाग को ठन्डा कर सकें और पाचन क्रिया को मजबूत करें।"
                  }
                ]
              }
            ]
          }
        };
        this.render();
        this.events();
        return Promise.resolve();
      });
  }

  events() {
    const {
      DailyHoroscope: { contentItem }
    } = this.state;
    document.addEventListener("DOMContentLoaded", () => {
      Array.from(contentItem).forEach((sign, index) => {
        const childnode = this.createZodiac({ ...sign, index });
        node.appendChild(childnode);
      });
    });
  }

  createZodiac(sign) {
    const multi = new ZodiacMulti(sign);
    const childnode = multi.render();
    multi.events(childnode);
    return childnode;
  }

  createHeader() {}

  render() {
    const {
      DailyHoroscope: { contentItem }
    } = this.state;
    const node = document.createElement("div");
    const appContainer = document.getElementById("app");
    node.setAttribute("class", "zodiac-group");
    console.log("CREATING MULTI CHILD", this.state);
    Array.from(contentItem).forEach((sign, index) => {
      const childnode = this.createZodiac({ ...sign, index });
      node.appendChild(childnode);
    });
    appContainer.appendChild(node);
  }
}

export default AstroAppContainer;
