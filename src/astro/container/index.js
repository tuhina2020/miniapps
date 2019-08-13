import ZodiacMulti from "@/astro/zodiacMulti";
import ZodiacSingle from "@/astro/zodiacSingle";
import * as utils from "@/utils";
import styles from "./index.css";
import Border from "@/astro/assets/zodiac/Border.svg";
class AstroAppContainer {
  constructor() {
    const url = new URL(document.location.href);
    const zodiac = parseInt(
      url.searchParams.get("zodiac") && url.searchParams.get("zodiac")
    );
    this.state = { zodiac };
    document.title = "ShareChat | Astrology";
    this.getFonts();
    this.getZodiacs();
  }

  getFonts() {
    const link = utils.createNewDiv({
      type: "link",
      setAttribute: {
        href: "https://fonts.googleapis.com/css?family=Quicksand&display=swap",
        rel: "stylesheet"
      }
    });
    document.head.appendChild(link);
  }

  createError(err) {
    const errContainer = utils.createNewDiv({
      type: "div",
      setAttribute: { style: "color:red;" }
    });
    errContainer.innerHTML = err;
    const container = document.getElementById("app");
    container.appendChild(errContainer);
  }

  getZodiacs() {
    // API call to get zodiac data
    let Authorization;
    try {
      Authorization = Android.get("userInfo").replace(
        new RegExp("\n", "g"),
        "\\n"
      );
    } catch (e) {
      Authorization =
        "Sn899vpok1xqFqzneiD+Cx+kdDIWIkxq3ANl0tZm2QvMBeyQYCzPrOn7FyuCr3uDOMTrk2z9yxTz\ntao/VWPC/tm1/DTE5G7X+TzhqAqMEX/tpKLSuWryoDL5AGJujrRz5+MxFe3+03qq9cZ+y5zpNLkP\nbyVqkLSW01q2YFWri3uWCuGMBgomarQzfElZyS0vryhgMRLBbx+kD17mbAsk2UDx9kd1aDddF18G\nhGDktsUoy6fa3oulhF8iJweP08RNNcZnAATAwPiV++B6ozMRDSIeWP6NTGLZg6npE0iVHtKlFtGQ\no8ZeXlHxxutUvWr+aTMDVZT0WtnK9Uvwv4lIvA==\n";
    }

    const requestObj = {
      url:
        "https://apis.sharechat.com/miniapp-service/v1.0.0/miniapp/274bd6ea-9fa6-4b77-8a0c-665b816c4a8b/meta?lang=Hindi",
      headers: {
        Authorization
      }
    };

    utils
      .request(requestObj)
      .then(res => {
        this.state = Object.assign(this.state, res);
        this.render();
        return Promise.resolve();
      })
      .catch(err => {
        // this.createError(err);
        const res = {
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
        this.state = Object.assign(this.state, res);
        this.render();
        return Promise.resolve();
      });
  }

  renderSingleZodiac(data) {
    const zodiac = new ZodiacSingle(data);
    const miniappContainer = document.getElementById("app");
    const Single = zodiac.render();
    miniappContainer.innerHTML = "";
    miniappContainer.appendChild(Single);
    zodiac.events();
  }

  renderMultipleZodiac(data) {
    const multi = new ZodiacMulti(data);
    const childnode = multi.render();
    multi.events(childnode);
    return childnode;
  }

  renderTitle() {
    const node = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "zodiac-title" }
    });
    node.innerText = "Select Your SunSign";
    return node;
  }

  renderZodiacGroup() {
    const {
      DailyHoroscope: { contentItem }
    } = this.state;

    const node = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "zodiac-group" }
    });

    Array.from(contentItem).forEach((sign, index) => {
      const childnode = this.renderMultipleZodiac({ ...sign, index });
      node.appendChild(childnode);
    });

    return node;
  }

  render() {
    const {
      DailyHoroscope: { contentItem },
      zodiac
    } = this.state;
    if (zodiac || zodiac === 0) {
      return this.renderSingleZodiac({ ...contentItem[zodiac], index: zodiac });
    }
    const appContainer = document.getElementById("app");
    const container = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "zodiac-group-container" }
    });
    const title = this.renderTitle();
    const zodiacGroup = this.renderZodiacGroup();
    container.appendChild(title);
    container.appendChild(zodiacGroup);
    appContainer.appendChild(container);
  }
}

export default AstroAppContainer;
