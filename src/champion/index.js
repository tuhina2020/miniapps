"use strict";

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
document.getElementsByClassName("leaderboardTitle")[0].innerText =
  monthNames[new Date().getMonth()] + " Leaderboard";

var championStrings = {
  English:
    "Score is calculated on basis of Share+Like you gather from registered profiles for top 3 ShareChat camera videos of every day.",
  Hindi:
    "हर दिन में ShareChat कैमरा  से बनाए  हुए वीडियोस से टॉप 3  वीडियोस को रजिस्टर्ड  प्रोफिल द्वारा मिले गए लाइक और शेयर के आधार पर स्कोर कैलकुलेशन किया जाएगा।",
  Marathi:
    "Sharechat चॅम्पिअन्स ,प्रत्येक दिवशी Sharechat कॅमेऱ्यातून बनविलेल्या व्हिडिओंपैकी सर्वोत्तम ३ व्हिडिओला नोंदणीकृत प्रोफिलेमधुन मिळालेल्या  लाईक आणि शेअरच्या आधारे गुणसंख्या मोजणी केली जाईल. ",
  Malayalam:
    "നിങ്ങളുടെ സ്കോർ തീരുമാനിക്കുന്നത് ഓരോ ദിവസവും  ഷെയർ ചാറ്റ് ക്യാമെറയിൽ നിങ്ങൾ ഷൂട്ട് ചെയ്യുന്ന നിങ്ങളുടെ ഏറ്റവും മികച്ച 3 വീഡിയോകൾക്ക്, രജിസ്റ്റേർഡ് പ്രൊഫൈലുകളിൽ നിന്ന് ലഭിക്കുന്ന ലൈക്കും ഷെയറും അനുസരിച്ചാണ്.",
  Tamil:
    "உங்கள் ஸ்கோரனது ஒரு நாளில் ஷேர்சாட் கேமரா மூலம் எடுக்கப்பட்ட சிறந்த 3 விடியோக்கு registered profile  இருந்து வரும் ஷேர் & லைக் வைத்து கணக்கிடப்படும்.",
  Gujarati:
    "તમારા સ્કોરની ગણતરી દરરોજના શેરચેટ કેમેરાથી બનેલા વિડિઓ પર રજીસ્ટર પ્રોફાઈલની મદદથી મળેલ લાઈક અને શેરના આધારે કરવામાં આવશે",
  Punjabi:
    "ਤੁਹਾਡਾ ਸਕੋਰ ਸ਼ੇਅਰਚੈਟ ਕੈਮਰਾ ਨਾਲ ਬਣਾਈ ਗਈ ਹਰ ਦਿਨ ਦੀ ਟਾਪ 3 ਵੀਡਿਓਜ਼ ਤੇ, ਰਜਿਸਟਰਡ ਪ੍ਰੋਫ਼ਾਈਲ ਦੁਆਰਾ ਮਿਲੇ ਸ਼ੇਅਰ ਅਤੇ ਲਾਈਕਸ ਦੇ ਅਧਾਰ ਤੇ ਗਿਣਿਆ ਜਾਏਗਾ |",
  Telugu:
    "హలో ఛాంపియన్స్ మీ ప్రొఫైల్ లో  ప్రతి రోజు sharechat కెమెరా తో చేసిన వీడియోస్ లో టాప్ 3 వీడియోస్ కి రెజిస్టర్డ్ ప్రొఫైల్స్ నుంచి వచ్చే లైక్స్ మరియు షేర్స్ తో మీ స్కోర్ క్యాలికులెట్ చెయ్యబడుతుంది. ",
  Bengali:
    "আপনার প্রোফাইলের স্কোর গণনা করা হয়েছে প্রত্যেক দিনের টপ ৩টি ভিডিওর শেয়ার+লাইক এর ভিত্তিতে যা শেয়ারচ্যাট ক্যামেরা দিয়ে বানানো হয়েছে !",
  Kannada:
    "ಸ್ಕೋರ್ ಅನ್ನು ರಿಜಿಸ್ಟರ್ ಪ್ರೊಫೈಲ್ ಗಳಿಂದ  ಬಂದಂತಹ ಟಾಪ್ 3 ವೀಡಿಯೋಸ್ ಗಳಿಗೆ  ಪ್ರತಿ ದಿನ ಪರಿಗಣಿಸುತ್ತೆವೆ. ಸ್ಕೋರ್, ವೀಡಿಯೋ ಗೆ ಬಂದಂತಹ  ಶೇರ್ಸ್ ಮತ್ತು ಲೈಕ್ಸ್ ನ ಆಧಾರದ ಮೇಲೆ ಇರುತ್ತದೆ. ಶೇರ್ ಚಾಟ್ ಕ್ಯಾಮೆರಾ ಉಪಯೋಗಿಸಿ ಮಾಡಿದ ವೀಡಿಯೋಸ್ ಗಳನ್ನೂ ಮಾತ್ರ ಪರಿಗಣಿಸಲಾಗುವುದು . ",
  Odia:
    "ପ୍ରତି ଦିନରେ ଆପଣଙ୍କ ରେଜିଷ୍ଟ୍ରର୍ଡ ପ୍ରୋଫାଇଲର ଟପ 3 ଶେୟରଚେଟ୍ କ୍ୟାମେରା ଫିଲଟର ବ୍ୟବହୃତ ଭିଡ଼ିଓରେ ମିଳିଥିବା ଲାଇକ+ଶେୟର ଆଧାରରେ ସ୍କୋର ନିର୍ଦ୍ଧାରିତ ହେବ।",
  Assamese:
    "শ্বেয়াৰ চাট কেমেৰা ব্য়ৱহাৰ কৰি আপোনাৰ ৰেজিষ্টাৰ প্ৰফাইলৰে পোষ্ট কৰা প্ৰত্য়েক দিনৰ টপ ৩ ভিডিঅ'ত লাভ কৰা শ্বেয়াৰ, লাইকৰ ওপৰত ভিত্তি কৰি আপোনাৰ স্ক'ৰ নিৰ্ণয় কৰা হয়।"
};

const payload = {
  data: {
    championsData: [
      {
        userId: "234",
        status: 1,
        views: 900,
        createdOn: null,
        updatedOn: "2019-08-10T08:04:29.789637000Z",
        rank: 1,
        user: {
          handle: "mitesh96",
          name: "Mitesh",
          profileThumb:
            "https://cdn.sharechat.com/thumb_sharechat_random_profile_6.jpg"
        }
      },
      {
        userId: "231",
        status: 2,
        views: 550,
        createdOn: null,
        updatedOn: "2019-08-10T08:03:42.542230000Z",
        rank: 2,
        user: {
          handle: "mitesh96",
          name: "Mitesh",
          profileThumb:
            "https://cdn.sharechat.com/thumb_sharechat_random_profile_6.jpg"
        }
      },
      {
        userId: "177",
        status: 1,
        views: 300,
        createdOn: null,
        updatedOn: "2019-08-10T08:32:17.313911000Z",
        rank: 3,
        user: {
          handle: "mitesh96",
          name: "Mitesh",
          profileThumb:
            "https://cdn.sharechat.com/thumb_sharechat_random_profile_6.jpg"
        }
      },
      {
        userId: "232",
        status: 1,
        views: 250,
        createdOn: null,
        updatedOn: "2019-08-10T08:04:14.866029000Z",
        rank: 4,
        user: {
          handle: "mitesh96",
          name: "Mitesh",
          profileThumb:
            "https://cdn.sharechat.com/thumb_sharechat_random_profile_6.jpg"
        }
      },
      {
        userId: "181",
        status: 1,
        views: 230,
        createdOn: null,
        updatedOn: "2019-08-10T08:32:37.274067000Z",
        rank: 5,
        user: {
          handle: "mitesh96",
          name: "Mitesh",
          profileThumb:
            "https://cdn.sharechat.com/thumb_sharechat_random_profile_6.jpg"
        }
      }
    ]
  },
  userData: {
    userId: "177",
    status: 1,
    views: 300,
    createdOn: null,
    updatedOn: "2019-08-10T08:32:17.313911000Z",
    rank: 3,
    user: {
      handle: "mitesh96",
      name: "Mitesh",
      profileThumb:
        "https://cdn.sharechat.com/thumb_sharechat_random_profile_6.jpg"
    }
  }
};
function _getRounded(n) {
  return Math.floor(n * 100) / 100;
}
function _rowTemplate(user) {
  return (
    "<td><h2>#" +
    user.rank +
    '</h2></td><td><div class="avatar-wrapper"><div class="bg-graphics avatar" style="background-image: url(\'' +
    user.user.profileThumb +
    '\');"></div><h3 class="text-ellipsis">' +
    user.user.name +
    '</h3><p class="text-ellipsis"><b>@' +
    user.user.handle +
    '</b></p></div></td><td class="text-center"><h2 class="font-bold">' +
    user.views +
    "</h2></td>"
  );
}
function renderHTML(response) {
  var arr = response.data.championsData;
  var myRank = response.userData.rank;
  var myData = response.userData;

  var contentToInject = arr
    .map(function(user, index) {
      var meInTopList = index + 1 === myRank;
      return (
        '<tr class="' +
        (meInTopList ? "active open-profile" : "open-profile") +
        '"' +
        " id=" +
        user.userId +
        ">" +
        _rowTemplate(user) +
        "</tr>"
      );
    })
    .join("");

  if (myRank > arr.length) {
    contentToInject +=
      '<tr class="active open-profile" id=' +
      myData.userId +
      ">" +
      _rowTemplate(myData) +
      "</tr>";
  }

  document.getElementById("root").innerHTML =
    "<table><thead><th>Rank</th><th>Youtuber</th><th>Views</th></thead><tbody>" +
    contentToInject +
    "</tbody></table>";
  var openProfileDivs = document.getElementsByClassName("open-profile");

  var clickHandler = function(id) {
    const json = {
      self: false,
      type: "profile",
      action: "open_activity",
      userId: id
    };
    console.log(json);
    Android.onAction(JSON.stringify(json));
  };

  for (var i = 0; i < openProfileDivs.length; i++) {
    const div = openProfileDivs[i];
    div.addEventListener(
      "click",
      function() {
        clickHandler(div.id);
      },
      false
    );
  }
}

function renderError(err) {
  const ele = document.getElementById("err");
  ele.innerHTML = err.toString();
}

function renderUnAuthorised() {
  const err = document.createElement("center");
  err.setAttribute("style", "padding: 2em 0;font-size: 2em;");
  err.innerText = " Not Authorised";
  const node = document.getElementById("root");
  node.innerHTML = "";
  node.appendChild(err);
}

document.addEventListener("DOMContentLoaded", function() {
  let Authorization;
  try {
    Authorization = Android.get("userInfo").replace(
      new RegExp("\n", "g"),
      "\\n"
    );
  } catch (e) {
    console.log("TESTING", navigator.userAgent);
    if (navigator.userAgent.match(/Mozilla/i)) {
      Authorization = "Sn899vpok1xqFqzneiD+Cx+kdDIWIkxq3ANl0tZm2QvMBeyQYCzPrOn7FyuCr3uDOMTrk2z9yxTz\ntao/VWPC/tm1/DTE5G7X+TzhqAqMEX/tpKLSuWryoDL5AGJujrRz5+MxFe3+03qq9cZ+y5zpNLkP\nbyVqkLSW01q2YFWri3uWCuGMBgomarQzfElZyS0vryhgMRLBbx+kD17mbAsk2UDx9kd1aDddF18G\nhGDktsUoy6fa3oulhF8iJweP08RNNcZnAATAwPiV++B6ozMRDSIeWP6NTGLZg6npE0iVHtKlFtGQ\no8ZeXlHxxutUvWr+aTMDVZT0WtnK9Uvwv4lIvA==\n".replace(
        new RegExp("\n", "g"),
        "\\n"
      );
    }
  }
  axios({
    method: "POST",
    url: "https://apis.sharechat.com/webcard-service/v1.0.0/getYoutuberRanks",
    headers: {
      Authorization: Authorization
    }
  })
    .then(function(response) {
      renderHTML(response.data);
    })
    .catch(function(err) {
      console.log("YOYO", err.response.status);
      if (err.response.status === 401) renderUnAuthorised();
      // renderError(err);
      // renderHTML(payload);
    });
});
