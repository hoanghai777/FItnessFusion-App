import { collection, doc, setDoc } from "firebase/firestore";
import { IExercise, IFood, INews } from "../type/common";
import { firebaseDb, firebaseStorage } from "../firebase";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const foodSample: IFood[] = [
  // {
  //   name: "Thịt bò",
  //   calories: 250,
  //   quantity: 100,
  //   image:
  //     "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/an_thit_bo_nhieu_co_tot_khong_benh_gi_can_han_che_an_thit_bo_1_5f471ad835.jpg",
  //   content: [
  //     {
  //       title: "Lý do mà các gymer nên ăn thịt bò",
  //       image:
  //         "https://bosothem.com/wp-content/uploads/2020/10/goc-giai-dap-vi-sao-tap-gym-nen-%C4%83n-thit-bo-bosothem_com-2.jpg",
  //       content:
  //         "Theo các chuyên gia dinh dưỡng, thịt bò chính là lựa chọn tốt nhất trong chế độ dinh dưỡng cho người tập gym. Đây cũng là thực phẩm mà các vận động viên thể hình chuyên nghiệp luôn có trong thực đơn. ",
  //     },
  //     {
  //       title: "Tập gym nên ăn thịt bò do có nhiều Protein và Kali",
  //       image: "",
  //       content:
  //         "Thịt bò rất giàu đạm, cụ thể trong 100gr loại thịt này thì có tới 25g protein. Trong dinh dưỡng của người tập gym, kali đóng vai trò rất quan trọng. Nó hỗ trợ giảm tình trạng chuột rút có thể xảy ra trong quá trình luyện tập. Ngoài ra Kali trong thịt bò còn giúp cho xương khớp được chắc khỏe hơn.",
  //     },
  //     {
  //       title: "Tập gym nên ăn thịt bò vì có chứa Creatine và Alanine",
  //       image:
  //         "https://bosothem.com/wp-content/uploads/2020/10/goc-giai-dap-vi-sao-tap-gym-nen-%C4%83n-thit-bo-bosothem_com-3.jpg",
  //       content:
  //         "Creatine có vai trò dự trữ năng lượng trong tế bào. Nó cung cấp với cường độ cao cho các hoạt động của cơ bắp. Và thúc đẩy hàm lượng mitochondria trong tế bào cơ gia tăng, giữ nước đồng thời hỗ trợ hoạt động của protein.",
  //     },
  //   ],
  // },
  // {
  //   name: "Trứng luộc",
  //   calories: 136,
  //   quantity: 100,
  //   image:
  //     "https://cdn.tgdd.vn/2021/06/CookRecipe/Avatar/sushi-bo-ca-hoi-thumbnail.jpg",
  //   content: [
  //     {
  //       title: "Thông tin cơ bản",
  //       image: "",
  //       content: "",
  //     },
  //   ],
  // },
  // {
  //   name: "Ức Gà",
  //   calories: 165,
  //   quantity: 100,
  //   image:
  //     "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/01/Air-Fryer-Chicken-Breast-main.jpg",
  //   content: [
  //     {
  //       title: "1. Những dưỡng chất từ ức gà cho cơ thể",
  //       image: "",
  //       content:
  //         "Có rất nhiều nghiên cứu cũng như dữ liệu cung cấp thông tin về giá trị dinh dưỡng của thịt gà. Trong đó, thịt ức gà ăn kiêng rất được quan tâm chú ý. Theo phân tích thống kê, cứ 1 lạng thịt ức gà sẽ cung cấp cho cơ thể 165 calo cùng 31,02 gam chất đạm. Đây là thực phẩm không chứa tinh bột và chất béo. Do vậy tỉ trọng dinh dưỡng còn lại là nước.",
  //     },
  //     {
  //       title: "2. Ăn ức gà có tác dụng gì?",
  //       image:
  //         "https://vinmec-prod.s3.amazonaws.com/images/20210609_132303_809304_uc-ga-co-tac-dung-g.max-1800x1800.jpg",
  //       content:
  //         "Việc sử dụng ức gà ăn kiêng có thể mang lại khá nhiều lợi ích cho cơ thể. Theo các nghiên cứu và phân tích có thể nhận định ức gà mang loại một số tác dụng tích cực sau:",
  //     },
  //   ],
  // },
  // {
  //   name: "Cơm trắng",
  //   calories: 130,
  //   quantity: 100,
  //   image:
  //     "https://www.allrecipes.com/thmb/RKpnSHLUDT2klppYgx8jAF47GyM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/52490-PuertoRicanSteamedRice-DDMFS-061-4x3-3c3da714aa614037ad1c135ec303526d.jpg",
  //   content: [
  //     {
  //       title: "Lợi ích của cơm đối với gymer",
  //       image: "",
  //       content:
  //         "Cơm mà chúng ta đang đề cập đến trong bài là cơm nấu từ gạo trắng. Gạo trắng là loại gạo trải qua quá trình xay xát và tinh chế để loại bỏ lớp cám và mầm. Phần gạo trắng được giữ lại chính là phần nội nhũ của hạt gạo. Khi trải qua quá trình tinh chế, dưỡng chất của hạt gạo (nguyên cám) đã bị giảm đi 25% - 80%. Đây là lý do khiến người ta phủ nhận hoàn toàn lợi ích của cơm trắng và cũng là lý do khiến nhiều người băn khoăn tập gym có nên ăn nhiều cơm hay không?",
  //     },
  //     {
  //       title: "Tập gym có nên ăn nhiều cơm không?",
  //       image: "",
  //       content:
  //         "Việc loại bỏ cơm ra khỏi chế độ ăn hàng ngày, cơ thể không được cung cấp đủ năng lượng. Khi đó gymer luôn có cảm giác đói bụng, khó chịu, uể oải, không đủ năng lượng và sự tập trung để luyện tập. Vì thế, cơm không nên thiếu trong thực đơn của gymer. Nhưng liệu rằng tập gym có nên ăn nhiều cơm không? Câu trả lời là bạn vẫn có thể ăn cơm nhưng nên hạn chế ăn nhiều. Bởi lẽ, Carbohydrate từ cơm khi vào cơ thể sẽ chuyển hóa thành đường. Ngay khi người tập gym ăn cơm, lượng đường trong máu sẽ tăng lên. Nếu họ nghỉ tập hoặc luyện tập cường độ quá nhẹ hoặc tập quá ít, lượng đường glucose trong máu sẽ tích tụ lại. Đây là nguyên nhân dẫn đến bệnh tiểu đường. ",
  //     },
  //   ],
  // },
  // {
  //   name: "Cá Hồi",
  //   calories: 210,
  //   quantity: 100,
  //   image:
  //     "https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg",
  //   content: [
  //     {
  //       title: "Giá trị dinh dưỡng của cá hồi",
  //       image: "",
  //       content: `Một phần cá hồi có chứa khoảng 200 calo, ít chất béo bão hòa, nhiều protein tốt và đây cũng là một trong những nguồn vitamin B12, Kali, sắt và vitamin D rất dồi dào.
  //       Vitamin B12 trong cá hồi giữ cho các tế bào máu và thần kinh hoạt động tốt, giúp tạo DNA. Ngoài ra, cá hồi có chứa nhiều axit béo omega-3, đây là axit béo "thiết yếu"cho cơ thể, giúp giảm các tác nhân gây ra các bệnh về tim mạch (bao gồm đau tim và đột quỵ), ung thư, sa sút trí tuệ, bệnh Alzheimer giảm viêm khớp dạng thấp.
  //       Vì những lợi ích đó, các chuyên gia khuyến cáo, đối với người trưởng thành nên ăn ít nhất hai lần hải sản mỗi tuần, đặc biệt là các loại cá có nhiều omega-3 như cá hồi. Phụ nữ mang thai và trẻ nhỏ nên tránh cá có nhiều thủy ngân, nhưng lại nên bổ sung cá hồi vào khẩu phần ăn.
  //       Không thể phủ định những lợi ích đối với sức khỏe do omega-3 mang lại. Nhưng nếu cơ thể được cung cấp một lượng lớn omega-3 trong các chất bổ sung thì có thể gây ra vấn đề chảy máu khi dùng một số loại thuốc chống đông máu. Bên cạnh đó, hiện cũng có nhiều tranh cãi về chất lượng và lợi ích cả loại cá hồi tự nhiên và cá hồi nuôi. Một số người nói rằng cá tự nhiên có lượng hóa chất và kháng sinh thấp hơn so với cá hồi nuôi. Nhưng những người khác lại cho rằng lựa chọn cá hồi nuôi là lựa chọn thông minh vì tính pháp lý và sự tuân thủ về những quy định về sự tăng trưởng và thu hoạch của cá.`,
  //     },
  //     {
  //       title: "Ăn cá hồi có tốt không?",
  //       image: "",
  //       content:
  //         "Thực chất, khi sử dụng dụng cá hồi thì thành phần vitamin B12 trong cá hồi giữ cho máu và các tế bào thần kinh luôn hoạt động và giúp cơ thể tạo ra DNA. Nhưng đối với sức khỏe thì ăn cá hồi có tốt không? Cá hồi rất giàu axit béo omega-3. Hầu hết các omega-3 là axit béo thiết yếu. Cơ thể chúng ta không thể tự tổng hợp được những axit này và chúng cũng đóng vai trò khá quan trọng trong cơ thể. Hơn nữa, các axit này là có tác dụng làm giảm các bệnh bao gồm:",
  //     },
  //   ],
  // },
  // {
  //   name: "Thịt heo",
  //   calories: 240,
  //   quantity: 100,
  //   image:
  //     "https://www.eatingwell.com/thmb/eHz4Kq-1Jve9gYXt4DBYqr6TWbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Healthy-Oven-Roasted-Pork-3x2-055-bbcd2b5b79904af4a26a9a4f63223e4a.jpg",
  //   content: [
  //     {
  //       title: "Tập gym có nên ăn thịt heo không?",
  //       image: "",
  //       content:
  //         "Nhìn chung, thịt lợn cung cấp một mức năng lượng dồi dào, hàm lượng đạm cao thực hiện tốt vai trò xây dựng và nuôi dưỡng cơ bắp cho các gymer. Tuy nhiên, khi ăn thịt lợn, chúng ta không tránh khỏi nạp vào người một lượng mỡ nhất định và cholesterol nhất định, đặc biệt cao đối với thịt mỡ. Vì vậy, chúng ta vẫn NÊN ăn thịt heo vì một số lợi ích về dinh dưỡng của nó, nhưng chỉ nên ở một lượng vừa phải nếu không muốn rơi vào tình trạng dư thừa mỡ và có nguy cơ mắc nhiều căn bệnh nguy hiểm về lâu dài. ",
  //     },
  //     {
  //       title: "Lợi ích của thịt heo đối với người tập gym ",
  //       image: "",
  //       content:
  //         "Như chúng ta đã biết, thịt heo chứa một lượng protein và axit amin tương đối lớn sẽ hỗ trợ tích cực cho việc phục hồi thể lực và cơ bắp. Nếu kết hợp với tập luyện hợp lý, bạn sẽ nhanh chóng có cho mình một thể hình cường tráng, khỏe mạnh với những múi cơ săn chắc.Lượng calo dồi dào trong loại thực phẩm này sẽ đáp ứng nhu cầu năng lượng cao của những ai rèn luyện thể hình. Bên cạnh đó, chất sắt trong thịt còn hỗ trợ tăng cường sản sinh ra năng lượng, giúp cơ thể hấp thụ năng lượng nhanh và hiệu quả hơn.Vitamin B6 đóng vai trò hỗ trợ chuyển hóa chất béo, carbonhydrate và protein, đồng thời điều hòa hoạt động của hệ thần kinh và trí óc. Trong khi đó, vitamin B2 lại có tác dụng giải độc cho cơ thể, tốt cho da. Vitamin A, D lại không thể thiếu đối với sức khỏe của răng và tóc. Sự có mặt của các chất chống oxy hóa cũng mang lại nhiều lợi ích, ngăn chặn nhiều căn bệnh nguy hiểm. Ngoài những lợi ích trên đối với sức khỏe và vóc dáng, thịt lợn còn được nhiều người yêu thích vì ngon miệng, dễ ăn và vô cùng đa dạng trong cách chế biến. Bạn có thể ăn thịt lợn vài bữa mỗi tuần mà không có cảm giác chán như nhiều món ăn khác.",
  //     },
  //     {
  //       title: " Lưu ý cách chế biến",
  //       image: "",
  //       content:
  //         "Cách chế biến đóng một vai trò rất lớn trong việc quyết định một món ăn có lợi cho sức khỏe hay không. Thực phẩm được chế biến theo cách chiên, xào, nhiều gia vị và dầu mỡ sẽ gia tăng lượng calo và chất béo nạp vào cơ thể, làm tăng cholesterol và nguy cơ béo phì. Ngược lại, luộc và hấp lại là những cách chế biến giúp thức ăn giữ được sự nguyên chất, bảo toàn được các chất dinh dưỡng vốn có.",
  //     },
  //   ],
  // },
  // {
  //   name: "Trái Bơ",
  //   calories: 160,
  //   quantity: 100,
  //   image:
  //     "https://m.ftscrt.com/food/1b051b13-11ad-4fb3-89f2-8a1b582b3e73_lg_sq.jpg",
  //   content: [
  //     {
  //       title: "Đầy đủ chất béo không bão hòa đơn",
  //       image: "",
  //       content:
  //         "Chất béo không bão hòa đơn (MUFAs) là chất béo lành mạnh và tiêu thụ chúng có liên quan đến việc giảm nguy cơ mắc bệnh tim, chủ yếu là vì chúng làm giảm LDL trong khi cải thiện HDL. Nghiên cứu cũng chỉ ra rằng MUFAs cũng ảnh hưởng tích cực đến mức insulin và kiểm soát lượng đường trong máu, có lợi cho bệnh tiểu đường loại 2 . Bơ là nguồn cung cấp axit oleic dồi dào, một MUFA được biết đến với khả năng cải thiện trí nhớ và chức năng não.",
  //     },
  //     {
  //       title: "Giàu vitamin C và K",
  //       image: "",
  //       content: `Vitamin K tham gia tích cực vào quá trình hấp thụ canxi trong cơ thể. Ăn bơ giúp hỗ trợ quá trình canxi hóa xương , giảm nguy cơ loãng xương. Vitamin K mang canxi ra khỏi động mạch ngăn ngừa sự hình thành mảng bám, nguyên nhân hàng đầu gây đau tim. Vitamin K là một loại vitamin đông máu và giúp ngăn ngừa mất máu quá nhiều do chấn thương.
  //       Vitamin C là một chất chống oxy hóa mạnh và chất loại bỏ các gốc tự do. Nó cũng rất quan trọng đối với sự tổng hợp collagen. Vitamin C giúp ngăn ngừa bệnh thiếu máubằng cách cải thiện sự hấp thụ sắt từ thức ăn của chúng ta. Lợi ích quan trọng nhất là khả năng tăng cường khả năng miễn dịch. Có bằng chứng được ghi nhận đầy đủ về vai trò của nó trong việc ngăn ngừa và giảm thời gian nhiễm trùng đường hô hấp, và ngăn ngừa các bệnh nhiễm trùng gây viêm phổi, sốt rét và tiêu chảy.`,
  //     },
  //     {
  //       title: "Tập gym có nên ăn bơ?",
  //       image: "",
  //       content: `Có. Nghiên cứu mới cho biết rằng thêm một quả bơ trong chế độ ăn uống hàng ngày của bạn có thể cải thiện khả năng tập trung chú ý ở những người trưởng thành có số đo chiều cao và cân nặng được phân loại là thừa cân hoặc béo phì.
  //       Bơ là một phần của danh sách thực phẩm lành mạnh vì nó là một nguồn cung cấp chất dinh dưỡng tốt như chất xơ, vitamin và khoáng chất; một nguồn tuyệt vời của vitamin C; và có chất béo lành mạnh bảo vệ tim. Bơ là một loại trái cây đa năng, về mặt thực vật là một quả mọng lớn có chứa một hạt hoặc một hạt.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Trái Chuối",
  //   calories: 90,
  //   quantity: 100,
  //   image:
  //     "https://cdn.tgdd.vn/Files/2017/12/18/1051448/vi-sao-dan-tap-gym-nen-an-nhieu-chuoi-202201171151451834.jpg",
  //   content: [
  //     {
  //       title: "Chuối có giúp tăng cơ không?",
  //       image: "",
  //       content:
  //         "Chuối là một lựa chọn bổ sung lành mạnh cho bất kỳ chế độ ăn kiêng nào, thậm chí là chế độ ăn tập trung vào việc xây dựng cơ bắp. Ngoài việc cung cấp năng lượng cho cơ thể, các chất dinh dưỡng trong quả chuối có tác dụng tăng cơ bắp. Cụ thể:",
  //     },
  //     {
  //       title: "Cung cấp năng lượng cho gymer luyện tập",
  //       image: "",
  //       content: `Chuối giàu năng lượng, cung cấp nhiều calo. Đây là nguồn cung cấp năng lượng lý tưởng cho các gymer khi luyện tập, giữa các buổi tập hay bổ sung năng lượng thiếu hụt sau các buổi tập. `,
  //     },
  //     {
  //       title: "Giúp giảm chuột rút, nhức mỏi và viêm ",
  //       image: "",
  //       content:
  //         "Các hợp chất dopamine và polyphenol trong chuối có thể giúp ngăn ngừa viêm nhiễm, thúc đẩy quá trình phục hồi cơ bắp. Kali trong chuối có tác dụng ngăn ngừa chuột rút cho mất cân bằng điện giải, làm giảm tình trạng nhức mỏi sau luyện tập. ",
  //     },
  //   ],
  // },
  // {
  //   name: "Cá Ngừ",
  //   calories: 132,
  //   quantity: 100,
  //   image:
  //     "https://www.livofy.com/health/wp-content/uploads/2023/02/Garlic-Herbed-Grilled-Tuna-Steaks_EXPS_DIYD19_44354_B04_24_1b-e1683879965500-1024x584.jpg",
  //   content: [
  //     {
  //       title: "Dinh Dưỡng Cá Ngừ",
  //       image: "",
  //       content:
  //         "Cá ngừ cung cấp nhiều chất béo như omega 3, 6 và 9 có lợi cho tim mạch, người mỡ máu. Sử dụng cá ngừ đồng thời sẽ bổ sung vitamin A, B12 rất có lợi cho quá trình tập gym, giảm cân, tăng cơ của gymer.",
  //     },
  //     {
  //       title: "Giúp phát triển cơ",
  //       image: "",
  //       content: `Cá ngừ có thể nói là 1 loại cá vô cùng dễ tìm nhưng lại rất giàu protein cùng khoáng chất. Ngoài ra, chúng cũng tốt cho tim mạch không kém gì cá hồi. Cá ngừ  có chứa rất nhiều chất béo bão hòa, cùng với đó là các nguyên tố vi lượng tốt như magie, Photpho, kali,... Protein có trong cá ngừ rất dễ tiêu hóa và cũng rất dễ chuyển hóa thành protein cho cơ thể.
  //       Cá ngừ là loại thực phẩm giàu chất béo có lợi, DHA tốt cho sức khỏe trí não, mắt, phù hợp với những người ăn kiêng, giữ dáng. Thịt cá ngừ có hàm lượng axit béo omega3 cao, nó giúp giảm axit béo omega-6 hoặc cholesterol xấu trong động mạch và mạch máu.
  //       Tuy mang trong mình nhiều dưỡng chất nhưng 1 nghiên cứu khác cũng cho thấy cá ngừ rất nhiều thủy ngân nên bạn không nên sử dụng cá ngừ 1 cách thường xuyên đâu nhé, hãy ăn kết hợp với nhiều thực phẩm khác.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Tôm",
  //   calories: 100,
  //   quantity: 100,
  //   image:
  //     "https://buffetposeidon.com/storage/app/media/Kham-pha-am-thuc/06.2023/%20150623-hai-san-tot-cho-nguoi-tap-gym-buffet-poseidon-03.jpg",
  //   content: [
  //     {
  //       title: "Tại sao nên ăn Tôm?",
  //       image: "",
  //       content:
  //         "Tôm chứa nguồn protein chất lượng cao, đặc biệt là ít chất béo và chứa lượng lớn axit amin leucine. Đây là những chất rất cần thiết cho sự tăng trưởng cơ bắp mà không quá nhiều calo. Tôm không chỉ ngon mà còn giàu dinh dưỡng, rất ít chất béo. Đây cũng là thực phẩm ăn kiêng được nhiều người lựa chọn.",
  //     },
  //     {
  //       title: "Giúp phát triển cơ",
  //       image: "",
  //       content: `Chứa hàm lượng đạm tương đương với các loại thịt động vật, giàu canxi, photpho, acid béo và các chất khoáng cần thiết, tôm là thực phẩm không thể thiếu trong khẩu phần dinh dưỡng cho dân nghiền thể thao.
  //       Trong 100g tôm tươi còn vỏ cung cấp hơn 150 calo gồm: 76,9g nước; 18,4g protein; 1120mg canxi; 211mg kali, 150mg photpho và nhiều vitamin chất lượng khác.
  //       Tôm chứa nhiều chất dinh dưỡng thiết yếu với cơ thể như Selen, colin, phốt- pho, đồng, vitamin B12… đặc biệt chứa astaxanthin là một chất chống oxy hóa có khả năng tiêu viêm, giảm sưng, ngừa lão hóa.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Sữa Tươi",
  //   calories: 75,
  //   quantity: 100,
  //   image:
  //     "https://cdn.tgdd.vn/Files/2022/05/05/1430310/1-ly-sua-tuoi-bao-nhieu-calo-uong-sua-tuoi-co-beo-khong-202205051435282032.jpg",
  //   content: [
  //     {
  //       title: "Sữa tốt như thế nào đối với người tập GYM?",
  //       image: "",
  //       content: `Cứ 100 gam sữa bò thanh trùng có chứa tới 3,2 gam protein. Ngoài ra, nó có rất nhiều đạm, can xi, vitamin cũng như khoáng chất khác. Từ đó, bổ sung lượng chất cần thiết cho cơ thể trong quá trình tập luyện.
  //         Đặc biệt, Protein trong sữa bò có khả năng đồng bộ hóa vào cơ thể rất nhanh. Tốc độ của việc này được đánh giá là cao hơn nhiều so với lượng protein trong thịt bò. Chất đạm có trong sữa được cơ thể hấp thụ nhiều, tỷ lệ là 95%. Trong khi con số này ở các loại thịt chỉ là khoảng 60%.`,
  //     },
  //     {
  //       title: "Giúp phát triển cơ",
  //       image: "",
  //       content: `Protein từ sữa có hàm lượng cao leucine và các axit amin chuỗi nhánh (BCAAs) dễ tiêu hóa và hấp thụ. Leucine là axit amin chính trong thành phần BCAA, chịu trách nhiệm tổng hợp protein tăng trưởng cơ bắp. Ngoài ra, whey protein có nguồn gốc từ sữa, là sản phẩm phụ còn sót lại từ quá trình sản xuất pho mát, cũng chứa nhiều leucine, giúp cải thiện sự phát triển cơ bắp. Như vậy, việc tiêu thụ protein từ sữa giúp kích thích cải thiện cơ bắp`,
  //     },
  //   ],
  // },
];
const exerciseSample: IExercise[] = [
//   {
//     name: "Bench press",
//     time: "45", // minutes
//     image:
//       "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
//     content: [
//       {
//         title: "Tại sao nên Bench Press?",
//         image: "",
//         content: `Không còn nghi ngờ gì nữa, lợi ích lớn nhất  bạn sẽ nhận được khi tập Bench Press là sức mạnh của phần thân trên được cải thiện đáng kể. Các nhóm cơ được hưởng lợi nhiều nhất từ bài tập Bench Press là cơ ngực, cơ vai trước của vai và cơ tam đầu. Tập Bench Press đều đặn sẽ kích thích sự phát triển của các nhóm cơ này cả về kích thước lẫn sức mạnh.

//             Bên cạnh đó, Bench Press cũng là bài tập cực kỳ hữu ích trong việc khôi phục sự cân bằng cho các nhóm cơ đối với các vận động viên bơi lội, leo núi hay đấu vật (do sử dụng cơ kéo nhiều).
            
//             Nhiều người khi tập luyện Bench Press cũng thấy có sự thay đổi tích cực về sức khoẻ cả về mặt thể chất (tăng cơ - giảm mỡ, xương khớp chắc khỏe hơn) lẫn tinh thần (giảm thiểu căng thẳng, stress).`,
//       },
//       {
//         title: "Các bước thực hiện Bench Press",
//         image: "",
//         content: ` 
// Bước 1: Bạn bắt đầu bài tập bằng việc nằm lên băng ghế phẳng với 2 chân trụ ở dưới sàn nhà.

// Bước 2: Hai tay nắm lấy thanh tạ đòn với khoảng cách rộng bằng vai hoặc hơn vai một chút sao cho thanh đòn được giữ trong lòng bàn tay và cánh tay, cổ tay thẳng. 

// Bước 3: Từ từ nhấc thanh tạ rời khỏi giá đỡ sao cho 2 cánh tay duỗi thẳng nhưng không khóa khớp. Nếu như bạn mới bắt đầu, có thể nhờ tới sự trợ giúp của huấn luyện viên để đảm bảo tạ không bị rơi xuống. 

// Bước 4: Hít thở thật mạnh và từ từ đưa thanh tạ qua vai rồi khoá khớp tại vị trí này. 

// Bước 5: Hít sâu và bắt đầu hạ thanh tạ thấp xuống dưới sao cho khuỷu tay hơi chếch 70 - 75 độ so với cơ thể còn cẳng tay thẳng đứng 

// Bước 6: Cố gắng hạ tạ xuống, hướng về vị trí ngực tới khi gần chạm hoặc chạm nhẹ vào ngực. Tại vị trí này, duy trì trong khoảng 1 giây.

// Bước 7: Thở ra và đẩy thanh tạ từ ngực hướng lên vai về vị trí ban đầu sao cho cánh tay duỗi thẳng hoàn toàn và khoá khuỷu tay ở vị trí trên cùng. 

// Bước 8: Để kết thúc bài tập, đưa tạ về giá đỡ bằng cách uốn cong khuỷu tay để hạ thanh tạ xuống với tư thế thẳng đứng. `,
//       },
//     ],
//   },
  // {
  //   name: "Barbell Squats",
  //   time: "45", // minutes
  //   image:
  //     "https://steelsupplements.com/cdn/shop/articles/shutterstock_2018381615_1000x.jpg?v=1636630369",
  //   content: [
  //     {
  //       title: "Tại sao Squat?",
  //       image: "",
  //       content:
  //         "Squat giúp cho phát triển và tăng cường cơ thân dưới. Với động tác đứng lên ngồi giúp phát triển cơ mông, săn chắc đùi, giảm mỡ thừa. Và việc bạn tập squat trong 1 thời gian dài cũng sẽ không khiến đùi to hay dáng thô vì nó chỉ giúp tăng cơ, giảm mỡ và săn chắc hơn.",
  //     },
  //     {
  //       title: "Các bước thực hiện bài Squat",
  //       image: "",
  //       content: `
  //       Bước 1: Vào tư thế chuẩn bị hai chân bằng vai

  //       Bước 2: Đặt tạ đòn ở vị trí trên vai, gánh tạ với lung vai và hai tay ở hai bên

  //       Bước 3: Thực hiện động tác squat, thẳng lưng hạ gối và đẩy mông ra sau

  //       Bước 4: Hít vào khi ngồi xổm xuống và thở ra khi trở về vị trí ban đầu
        
  //       Bước 5: Thực hiện 3 hiệp với 10-12 lần mỗi hiệp`,
  //     },
  //   ],
  // },
  // {
  //   name: "Deadlift",
  //   time: "45", // minutes
  //   image:
  //     "https://www.transparentlabs.com/cdn/shop/articles/TL_Blog_Template_30.jpg?v=1670590121",
  //   content: [
  //     {
  //       title: "Tại sao Deadlift?",
  //       image: "",
  //       content: "Deadlift là bài tập được đánh giá là có tác dụng cải thiện sức mạnh tay cầm hiệu quả nhất. Ngoài ra khi luyện tập deadlift nhuần nhuyễn, bạn sẽ tránh được nhiều chấn thương trong cuộc sống hàng ngày khi phải nâng những vật nặng trên mặt đất. Bài tập này cũng sẽ cải thiện được độ bền, độ dẻo dai, sức mạnh cho người tập.",
  //     },
  //     {
  //       title: "Các bước thực hiện Deadlift",
  //       image: "",
  //       content:`
  //       Bước 1: Dang rộng hai chân sao cho khoảng cách rộng hơn vai, khuỵu nhẹ đầu gối, hai tay nắm thật chặt tạ đòn để hai tay chạm vào nhau. Lưu ý giữ lưng thật thẳng, ưỡn ngực ra phía trước.
        
  //       Bước 2: Kéo căng phần vai, từ từ nâng tạ lên khỏi mặt đất. Sau đó, giữ thăng bằng tạ.

  //       Bước 3: Dồn trọng lực cơ thể về trung tâm phần gót chân, cố giữ tạ càng gần thì càng tốt. 

  //       Bước 4: Nâng cao tạ đến khi ở vị trí ngang với đùi thì hạ tạ xuống rồi lặp lại động tác. `,
  //     },
  //   ],
  // },
  // {
  //   name: "Shoulder Press",
  //   time: "45", // minutes
  //   image:
  //     "https://bizweb.dktcdn.net/100/011/344/files/dumbbell-shoulder-press.jpg?v=1679995589083",
  //   content: [
  //     {
  //       title: "Tại sao Shoulder Press?",
  //       image: "",
  //       content: "Một lợi ích quan trọng khác của các bài tập shoulder press đó là tăng sức mạnh cho xương. Trong quá trình nâng tạ, cũng giống như cơ bắp, xương cũng dần thích nghi với “trọng lượng” tạ được nâng bằng cách tăng mật độ khoáng chất. Điều này giúp xương trở nên chắc khỏe hơn và giảm nguy cơ loãng xương.",
  //     },
  //     {
  //       title: "Các bước thực hiện Shoulder press",
  //       image: "",
  //       content:`
  //       Bước 1: Ngồi trên ghế và giữ lưng thẳng, hai tay cầm hai tạ đơn ngang vai sao cho khuỷu tay vuông góc. 

  //       Bước 2: Thở ra và đẩy tạ lên cao đến khi 2 tay duỗi thẳng. 
        
  //       Bước 3: Giữ 1 nhịp, sau đó thở ra và hạ tạ về vị trí ngang vai. 
        
  //       Bước 5: Thực hiện lặp lại các động tác trên.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Incline Press",
  //   time: "45", // minutes
  //   image:
  //     "https://bizweb.dktcdn.net/100/011/344/files/dumbbell-shoulder-press.jpg?v=1679995589083",
  //   content: [
  //     {
  //       title: "Tại sao Incline Press?",
  //       image: "",
  //       content: "Incline Dumbbell Press là bài tập sức mạnh tác động trực tiếp lên nhóm cơ chính là cơ ngực và nhóm cơ phụ là cơ vai, cơ tay sau. Bài tập này mang lại nhiều lợi ích thiết thực cho người tập Gym. Chính vì thế, các Gymer muốn chinh phục sức mạnh thì không thể bỏ qua bài tập này. Dưới đây là một số lợi ích lớn dễ thấy nhất mà bài tập Incline Dumbbell Press đem lại cho bạn. Cụ thể gồm:",
  //     },
  //     {
  //       title: "Các bước thực hiện Incline Press",
  //       image: "",
  //       content:`
  //       Bước 1: Ngồi lên ghế, hai chân trụ dưới sàn và hai tay cầm tạ đơn đặt lên đùi. 

  //       Bước 2: Siết cơ ngực và nâng tạ thẳng lên vị trí ngang vai, lòng bàn tay hướng về phía đùi. Sau đó giữ nguyên tư thế này khoảng 1 nhịp. 
        
  //       Bước 3: Hạ tạ xuống sao cho cánh tay vuông góc với bắp tay. 
        
  //       Bước 4: Thực hiện lặp lại động tác nâng - hạ tạ cho đến khi hết set tập.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Bicep curls",
  //   time: "45", // minutes
  //   image:
  //     "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Alternate-Biceps-Curl-resized.png",
  //   content: [
  //     {
  //       title: "Tại sao nên Curl?",
  //       image: "",
  //       content: "Biceps Curl được xem là bài tập có tác dụng rất tốt đối với quá trình rèn luyện và hình thành cơ bắp của các Gymer. Vì lẽ đó, trong lịch tập Gym của các Gymer mới lẫn chuyên nghiệp đều không thể thiếu bài tập Biceps Curl này. Vậy, bạn đã biết cụ thể bài tập cơ bắp tay trước Biceps Curl này mang lại những lợi ích gì cho người tập thể hình chưa? Dưới đây, Thiên Trường Sport sẽ liệt kê các lợi ích của Biceps Curl và cụ thể nó gồm có:",
  //     },
  //     {
  //       title: "Các bước thực hiện Bicep Curl",
  //       image: "",
  //       content:`
  //       Bước 1: đứng thẳng người, khoảng cách 2 chân rộng bằng vai. Mỗi tay cầm 1 tạ đơn. Lòng bàn tay hướng vào trong thân người.
        
  //       Bước 2: thở ra, đồng thời nâng 2 tạ lên cao sao cho 2 tạ đơn ngang vai. Chỉ chuyển động cánh tay, toàn bộ thân người vẫn giữ thẳng, không lắc lư, di chuyển theo chuyển động của cánh tay.
       
  //       Bước 3: hít vào, từ từ hạ tạ xuống về vị trí ban đầu.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Tricep Extensions",
  //   time: "45", // minutes
  //   image:
  //     "https://www.hevyapp.com/wp-content/uploads/02001101-Cable-Pushdown-with-rope-attachment_Upper-Arms_small.jpg",
  //   content: [
  //     {
  //       title: "Tại sao nên Tricep Extension?",
  //       image: "",
  //       content: "Mở rộng thêm một bài tập cơ tam đầu tại nhà nữa là bài tập Triceps Extension. Đây là một bài tập cô lập hoạt động cơ ở mặt sau của cánh tay trên. Giúp tăng sức mạnh của cánh tay và cải thiện hình dạng của cánh tay. Bài tập mở rộng cơ tam đầu này là bài tập cô lập. Vì nó chỉ liên quan đến chuyển động ở một khớp duy nhất là khớp khuỷu tay.",
  //     },
  //     {
  //       title: "Các bước thực hiện Tricep Extension",
  //       image: "",
  //       content:`
  //       1. Sử dụng thanh thẳng hoặc thanh E-Z nối vào ròng rọc. Nắm vào thanh tạ với lòng bàn tay hướng xuống.

  //       Quay lưng về phía tạ, cúi thấp người khoảng 30-45 độ. Đưa cánh tay trên song song với mặt đất. Cẳng tay co lại, căng cơ tay sau. Giữ cho cánh tay của bạn sát đầu. Đây là vị trí bắt đầu.
        
  //       2. Dùng cơ tay sau duỗi cánh tay, đẩy thanh tạ ra xa. Thở ra. Cánh tay trên giữ nguyên, chỉ di chuyển phần cẳng tay.
         
  //       3. Từ từ đưa thanh tạ trở về vị trí ban đầu có điều khiển. Hít vào trong suốt quá trình.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Leg Press",
  //   time: "45", // minutes
  //   image:
  //     "https://m.media-amazon.com/images/I/71QjB5MjtBL._AC_UF1000,1000_QL80_.jpg",
  //   content: [
  //     {
  //       title: "Tại sao nên Leg Press?",
  //       image: "",
  //       content: "Leg Press có tên tiếng Việt là bài tập đạp đùi. Sử dụng máy tập Leg Press chuyên dụng và có tác dụng phát triển cơ đùi, bắp chân, cơ mông rất hiệu quả. Thực hiện Leg Press đúng cách, các nhóm cơ ở phần thân dưới của cơ thể. Sẽ được tác động tối đa, giúp phát triển và nâng cao sức mạnh cơ bắp cho người tập. Tùy vào vị trí đặt chân mà nhóm cơ chính là cơ bắp chân. Hoặc cơ đùi sẽ được tác động nhiều nhất. Cơ đùi sau và cơ mông là 2 nhóm cơ phụ được thúc đẩy phát triển trong bài tập Leg Press.",
  //     },
  //     {
  //       title: "Các bước thực hiện Leg Press",
  //       image: "",
  //       content:`2 tay nắm phần tay cầm của máy, cạnh vị trí ghế ngồi và chân để thẳng nhưng không để thẳng tuyệt đối, vẫn có độ cong chân vừa phải. Tháo chốt an toàn của máy tập Leg Press, hít vào và siết chặt cơ mông, cơ đùi. Từ từ hạ chân xuống để đùi và chân tạo thành góc 90 độ. Giữ vị trí đó trong 1 giây.

  //       Tập trung vào cơ đùi, cơ bắp chân, cơ mông và từ từ đẩy máy lên vị trí cũ. Thở ra và giữ vị trí đó trong 1 giây. Lặp lại các động tác để tiếp tục bài tập và thực hiện từ 10-15 lần/hiệp.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Chest fly",
  //   time: "45", // minutes
  //   image:
  //     "https://static.strengthlevel.com/images/illustrations/machine-chest-fly-1000x1000.jpg",
  //   content: [
  //     {
  //       title: "Tại sao nên Chest Fly?",
  //       image: "",
  //       content: `Các bài tập với máy chest fly có thể giúp tăng sức mạnh và khối lượng cơ ngực bằng cách tác động vào nhóm cơ này. Cơ ngực gồm có 2 phần là cơ ngực lớn và cơ ngực nhỏ. Các bài tập với máy chest fly chủ yếu có lợi cho cơ ngực lớn. Đây là nhóm cơ chịu trách nhiệm vận động ở khớp vai và thường được sử dụng trong các hoạt động hàng ngày như xách đồ nặng hoặc bế em bé. Ngoài ra, cơ ngực này cũng chịu trách nhiệm kiểm soát lồng ngực và xương sườn khi hít thở sâu.

  //       Ngoài ra, việc thực hiện các bài tập với máy tập chest fly cũng đặc biệt hữu ích nếu bạn là người mới. Bởi khi thực hiện với máy, bạn sẽ thực hiện các bài tập ở tư thế ngồi và được hỗ trợ bởi một miếng đệm phía sau nên dễ dàng tập luyện. Ngoài ra, tư thế ngồi cũng giúp bạn dồn toàn lực vào cơ ngực.`,
  //     },
  //     {
  //       title: "Các bước thực hiện Deadlift",
  //       image: "",
  //       content:`
  //       Bước 1: Ngồi thẳng lưng, thả lỏng cổ và vai. Bàn chân đặt trên sàn
       
  //       Bước 2: Nắm lấy tay cầm sao cho lòng bàn tay hướng về phía trước
        
  //       Bước 3: Di chuyển hai tay cầm khép vào nhau với chuyển động chậm, có kiểm soát. Giữ khuỷu tay hơi cong nhẹ, mềm mại với cổ tay thả lỏng.
       
  //       Bước 4:  Tạm dừng một giây sau khi cánh tay khép hoàn toàn trước ngực.
       
  //       Bước 5:  Di chuyển cánh tay từ từ trở lại vị trí bắt đầu, mở ngực và giữ thẳng lưng
      
  //       Bước 6: Thực hiện 2 hiệp, mỗi hiệp từ 7 đến 10 lần lặp lại.`,
  //     },
  //   ],
  // },
  // {
  //   name: "Pull-Ups",
  //   time: "45", // minutes
  //   image:
  //     "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up-variations.jpg",
  //   content: [
  //     {
  //       title: "Tại sao nên Pull Up?",
  //       image: "",
  //       content: `Hít xà huy động sức mạnh của toàn bộ phần thân trên. Nó luyện cho cơ thể bạn biết cách phối hợp nhiều nhóm cơ để thực hiện đúng động tác, từ đó nâng cao sức mạnh toàn diện và đảm bảo sự cân đối của cơ thể.
  //       Điều đó cũng giúp chia đều trọng lượng cơ thể cho nhiều cơ khác nhau, đảm bảo cơ và khớp của bạn được an toàn hơn so với các bài tập chỉ tập trung vào một nhóm cơ duy nhất.`,
  //     },
  //     {
  //       title: "Các bước thực hiện Pull Úp",
  //       image: "",
  //       content:`
  //       Nắm tay lên xà sao cho hai tay rộng bằng hoặc hơn vai một chút.  

  //       Giữ chặt cơ thể, uốn cong ở khuỷu tay và vai
        
  //       Từ từ kéo phần ngực của bạn về phía thanh cho tới khi cằm ngang với xà.
        
  //       Chậm rãi hạ cơ thể xuống tới vị trí ban đầu khi tay được duỗi thẳng hoàn toàn. 
        
  //       Lưu ý: Tránh đung đưa chân hay cơ thể có thể khiến bạn nhanh mất sức hơn. `,
  //     },
  //   ],
  // },
  {
    name: "Cable Rows",
    time: "45", // minutes
    image:
      "https://static.strengthlevel.com/images/illustrations/seated-cable-row-1000x1000.jpg",
    content: [
      {
        title: "Tại sao nên Cable Row?",
        image: "",
        content: "Cable Row tác động giúp cơ lưng sẽ trở nên săn chắc, phát triển cơ lưng một cách toàn diện. Bài tập Cable Row còn giúp tăng cường sức mạnh cơ lưng dưới, cơ dọc lưng và tác động thêm một phần cơ bụng, đùi sau.",
      },
      {
        title: "Các bước thực hiện Cable row",
        image: "",
        content:`
        Bước 1: Đầu tiên, bạn cần điều chỉnh trọng lượng của dụng cụ tập gym sao cho phù hợp nhất với sức khỏe của mình.
        
        Bước Bạn ngồi trên ghế của máy kéo cáp, hai tay giữ tay cầm chữ V, lòng bàn tay hướng vào nhau, chân đặt lên điểm tựa của 2 bàn đạp trên máy, đầu gối hơi khuỵu xuống nhưng khớp gối không khóa. . Hơi nghiêng người về phía trước, nâng ngực và kéo căng cơ ngực. Đây là vị trí bắt đầu cho bài tập đi dây có ghế ngồi.
        
        Bước 2: Giữ yên cơ thể, kéo tay cầm chữ V về phía thân mình, thân mình và chân tạo thành góc 90 độ. Kéo tay cầm chữ V về phía bụng, kéo căng cơ lưng và giữ tư thế này trong khoảng 1 giây. Thở ra khi bạn làm điều này.
       
        Bước 3:  Từ từ kéo tay cầm hình chữ V về vị trí ban đầu, hít vào khi thực hiện động tác này, chú ý và từ từ kiểm soát độ mạnh khi thả tay cầm về vị trí ban đầu.
       
        Bước 4: Lặp lại toàn bộ động tác để tiếp tục luyện tập cho đến khi đạt được số lần lặp lại như mong muốn. Lưu ý khi thực hiện bài tập ngồi đu dây, cố gắng không để người đu đưa, vì như vậy sẽ gây tổn thương cho cơ lưng và không thể mang lại hiệu quả như mong đợi. Ngoài ra, nếu máy không có tay cầm hình chữ V, bạn có thể tập ngửa thùng với tay cầm theo chiều ngang, lòng bàn tay úp hoặc ngửa nhưng nhớ là tay cầm hẹp.
        `,
      },
    ],
  },
];
const newsSample: INews[] = [
  // {
  //   name: "Vì sao sức khỏe là quan trọng nhất?",
  //   subTitle: "",
  //   image:
  //     "https://thegioidiengiai.com/images/detailed/0/vi-sao-suc-khoe-quan-trong-nhat-voi-cuoc-song-moi-nguoi.jpg",
  //   content: [
  //     {
  //       title: " SỨC KHỎE TỐT LÀ NỀN TẢNG VỮNG CHẮC CỦA CUỘC SỐNG HẠNH PHÚC",
  //       image: "",
  //       content: `Có lẽ chúng ta không ai sinh ra trên đời mà lại không mong muốn mình khỏe mạnh cả. Phải khỏe mạnh thì chúng ta mới tận hưởng cuộc sống một cách trọn vẹn nhất. Sức khỏe tốt là nền tảng cơ bản của một cuộc sống vui vẻ, hạnh phúc, là cơ sở quan trọng để mỗi người thực hiện ý tưởng, ước mơ, nguyện vọng.
  //       Bởi nếu bệnh tật, ốm đau, chúng ta thường sẽ không còn đủ sức khỏe, tâm trí nào mà lo lắng, suy nghĩ đến những việc khác. Đó là chưa nói đến chuyện bệnh tật còn khiến con người tiêu hao tiền bạc, của cải, ảnh hưởng đến những người thân trong gia đình, xã hội mất đi một người khỏe`,
  //     },
  //     {
  //       title: "Xây dựng chế độ ăn uống khoa học, lành mạnh",
  //       image: "",
  //       content:
  //         "Ăn uống à một trong những yếu tố vô cùng quan trọng quyết đinh đến sức khỏe của con người. Ông tổ của ngành y Hippocrates cũng đã từng nói “Hãy để thức ăn là thuốc của bạn”, không có loại thuốc nào quý giá và hữu hiệu bằng việc bạn lựa chọn cẩn thận, thông minh và khoa học những loại thực phẩm mà bạn tiêu thụ hàng ngày.",
  //     },
  //     {
  //       title: "Ăn nhiều hơn rau củ quả tươi, và các loại hạt",
  //       image: "",
  //       content:
  //         "Rau củ quả và các loại hạt là thực phẩm rất tốt cho sức khỏe. Bởi những loại thực phẩm này là cả một kho chất dinh dưỡng, vitamin, khoáng chất… có thể cung cấp cho cơ thể, giúp cơ thể khỏe mạnh hơn. Các loại củ như khoai tây, khoai lang, các loại đậu và ngũ cốc không chứa gluten như yến mạch sẽ tạo ra năng lượng tốt cho cơ thể, rất thích hợp để chúng ta cung cấp cho cơ thể mỗi ngày.",
  //     },
  //     {
  //       title: "Tránh xa các loại thức ăn chế biến sẵn, thịt đỏ, rượu bia",
  //       image: "",
  //       content:
  //         "Bên cạnh việc bổ sung các loại thực phẩm tốt, chúng ta cũng cần tránh tối đa việc tiêu thu những loại thức ăn, nướng uống chế biến sẵn, thức ăn đóng hộp, thức ăn ăn nhanh, đồ ăn nhiều dầu mỡ, đồ nướng, thức ăn, nước uống chứa hóa chất, phụ gia, đường công nghiệp như hamburger, hotdog, nước ngọt, rượu bia… Những loại thực phẩm này là một ổ chứa axit dư thừa và các hóa chất gây ảnh hưởng xấu cho cơ thể. Không ai khỏe mạnh, sống lâu mà chỉ ăn đồ ăn đóng hộp cả. Đặc biệt, chúng ta cũng nên hạn chế ăn các loại thịt đỏ như thịt heo, bò, cừu, dê… hoặc các loại thịt đã qua chế biến như thịt xông khói, thịt muối…",
  //     },
  //     {
  //       title: "Thường xuyên vậy động, luyện tập thể dục, thể thao",
  //       image: "",
  //       content:
  //         "Một điều rất quan trọng để có sức khỏe tốt nữa là bạn phải vận động cơ thể thường xuyên. Nếu bạn chăm chỉ luyện tập thể dục, thể thao vận động thường xuyện, vóc dáng của bạn không chỉ được cải thiện mà não nộ và các hormone tong cơ thể còn được kích thích để hoạt động tối ưu, tăng cường sức khỏe.Nhiều nghiên cứu đã chỉ ra rằng, tập thể duc, thể thao có thể làm giảm trầm cảm và giảm nguy cơ mắc các bệnh mạn tính như béo phì, tiểu đường loại 2, bệnh tim mạch, bệnh Alzhemer và rất nhiều loại khác. Chúng ta có nhiều lựa chọn cho phương pháp và hình thức tập thể dục, sao cho nó phải phù hợp với sức khỏe, lứa tuổi, giới tính. Một số hình thức vận độngbạn có thể lựa chọn như: gym, đi hoặc chạy bộ, yoga, chạy xe đạp, tâọ những bài thể dục nhẹ nhàng…",
  //     },
  //   ],
  // },
  // {
  //   name: "TẬP GYM LÀ GÌ? TẠI SAO CÁC BẠN TRẺ NÊN TẬP GYM HÀNG NGÀY",
  //   subTitle: "",
  //   image: "https://swequity.vn/wp-content/uploads/2019/07/tap-gym-nam.jpg",
  //   content: [
  //     {
  //       title: "Gym là gì?",
  //       image: "",
  //       content:
  //         "Tập gym là một hình thức vận động thông qua sự hỗ trợ của máy móc vào các cơ nhằm giúp cơ thể khỏe mạnh. Giúp các bạn trẻ tự tin hơn về vóc dáng của mình.",
  //     },
  //     {
  //       title: "Vậy tập gym có tác dụng gì?",
  //       image: "",
  //       content: `Tập gym mang lại thân hình đẹp và săn chắc:
  //       Luyện tập thể dục hàng ngày kết hợp với chế độ dinh dưỡng hợp lý. Nó sẽ mang lại cho mọi người vóc dáng và thân hình cân đối. Lượng mỡ thừa giảm đáng kể, cơ bắp săn chắc và thân hình cân đối.
        
  //       Tập gym giúp tăng cường sức mạnh cơ bắp:
  //       Chắc hẳn bạn cũng đã thấy cảnh một số anh chàng và cô nàng trông thì có vẻ khỏe nhưng thể lực thực sự rất yếu. Đó chính là lý do khiến mọi người cần phải tập gym để có thể tăng cường thể lực thực hiện những công việc đòi hỏi thể lực cao. Khi bạn tập Gym, các mô cơ yếu sẽ được loại bỏ và xây dựng các mô cơ mới to hơn, khỏe mạnh hơn.
  //       Khi bạn luyện tập, các bài tập cơ vai, cơ lưng, cơ bụng, chân. Nó giúp tăng cường sức mạnh, độ dẻo dai, khả năng chịu đựng của các cơ giúp bạn phát triển chiều cao rất tốt.`,
  //     },
  //     {
  //       title: "Tập gym giúp phòng ngừa bệnh tật",
  //       image: "",
  //       content:
  //         "Tập thể dục thường xuyên giúp con người duy trì tuổi thọ. Cũng như thế, tập gym thường xuyên giúp cải thiện sức khỏe tim mạch, giảm lượng cholesterol, phòng bệnh tai biến mạch máu não, nhồi máu cơ tim, huyết áp, xơ vữa động mạch… Ngoài ra, bạn có thể tránh được một số bệnh như loãng xương, tiểu đường, ung thư… Giúp bạn có được cơ thể khỏe mạnh, sức khỏe dồi dào mang lại cho bạn cuộc sống viên mãn.",
  //     },
  //     {
  //       title: "Tập Gym gúp xương chắc khỏe:",
  //       image: "",
  //       content:
  //         "Các mô xương của chúng ta bị thoái hóa dần theo tuổi tác, có người còn bị tình trạng loãng xương ngay khi còn trẻ. Vì thế, khi luyện tập thể hình sẽ giúp hỗ trợ quá trình tạo xương mới. Giúp xương khớp khỏe mạnh, hạn chế chấn thương và giảm tình trạng thoái hóa xương, loãng xương.",
  //     },
  //     {
  //       title: "Đi tập Gym cần chuẩn bị những gì",
  //       image: "",
  //       content: `
  //       Bạn cần có sự quyết tâm thực sự để không cảm thấy tự ti về body của mình khi tập luyện.
  //       Thời gian đầu, cơ thể sẽ bị đau nhức nhưng sau khi tập một thời gian thì sẽ giảm dần. Vậy nên bạn hãy cố gắng kiên trì một thời gian đầu.
  //       Hành trang của bạn khi tập gym bao gồm: quần áo tập gym, nước, khăn tắm, sữa tắm, dầu gội và găng tay nếu cần.
  //       Bạn nên chọn loại quần áo co dãn tốt, có khả năng thấm hút mồ hồi. Tốt nhất là quần áo nên làm từ 100% cotton.
  //       Giày thể thao bạn nên chọn loại đế bằng, nhẹ, thoáng khí có xốp lót chân.`,
  //     },
  //   ],
  // },
  // {
  //   name: "CHẾ ĐỘ ĂN CHO NGƯỜI TẬP GYM ĐẢM BẢO DINH DƯỠNG",
  //   subTitle: "",
  //   image:
  //     "https://medlatec.vn/ImagePath/images/20220907/20220907_che-do-an-cho-nguoi-tap-gym-1.jpg",
  //   content: [
  //     {
  //       title: "Nguồn dinh dưỡng cần thiết trong chế độ ăn cho người tập gym",
  //       image: "",
  //       content: `Tập gym là hoạt động có lợi cho sức khỏe, giúp cho bạn có một vóc dáng lý tưởng. Đồng thời việc tập thể hình đối kháng sẽ tăng sức mạnh về cơ bắp và phòng được một số bệnh như: bệnh tim, thận, ung thư. 

  //       Trong đó, chế độ ăn cho người tập gym cũng góp phần quan trọng để hỗ trợ cung cấp các dưỡng chất cần thiết tốt cho cơ thể. Một số thực phẩm đảm bảo về hiệu quả cho người tập gym gồm có:`,
  //     },
  //     {
  //       title: "Chất protein",
  //       image: "",
  //       content: `Protein hay nhóm chất đạm có chứa nhiều axit amin là chất dinh dưỡng cần thiết trong chế độ ăn cho người tập gym. Chất đạm có vai trò quan trọng giúp tăng cơ bắp, giảm mỡ trong cơ thể. 

  //       Khẩu phần ăn thích hợp cho người tập gym mỗi ngày cần ít nhất 2,2 gam chất đạm/ kg theo trọng lượng cơ thể của mỗi người. `,
  //     },
  //     {
  //       title: "Chất xơ ",
  //       image: "",
  //       content:
  //         "Chất xơ là dưỡng chất không thể thiếu trong chế độ ăn cho người tập gym. Chất xơ giúp cho cơ bắp được săn chắc, giảm đau cơ bắp và xương khớp. Bên cạnh đó, chất xơ còn đẩy nhanh mức tiêu thụ lượng mỡ thừa không lành mạnh trong cơ thể. Những loại thực phẩm bổ sung chất xơ thiết yếu cho cơ thể như là cà chua, đậu xanh, rau bina, rau xà lách,... bạn nên tăng cường trong mỗi bữa ăn hàng ngày.",
  //     },
  //     {
  //       title: "Chất béo ",
  //       image: "",
  //       content:
  //         "Chế độ ăn cho người tập gym cần đảm bảo về dinh dưỡng không thể loại bỏ chất béo trong khẩu phần ăn. Chất béo đóng vai trò quan trọng về cấu tạo của tế bào, cung cấp năng lượng và giúp hấp thụ những hoạt chất vitamin tan trong dầu A,D,E,K. Ngoài ra, những người đang cần tăng cơ, tăng cân thì chất béo là dưỡng chất tốt để nâng cao hiệu suất tập gym. ",
  //     },
  //     {
  //       title: "Tinh bột",
  //       image: "",
  //       content: `Tinh bột hay còn được gọi là carbohydrate có khả năng cung cấp năng lượng rất tốt cho cơ thể đặc biệt là trong chế độ ăn cho người tập gym. Một gam của tinh bột có thể cung cấp đến 4 calo. Đồng thời, thời gian tiêu thụ của tinh bột khá nhanh chỉ trong khoảng từ 1,5 - 2 giờ. Tinh bột có nhiều trong một số lương thực như là khoai, sắn, cơm, bún, phở.

  //       Các chuyên gia dinh dưỡng khuyến nghị với người tập gym để tăng cân nên bổ sung tinh bột với tỷ lệ là 45 - 60% của tổng lượng calo nạp vào mỗi ngày. Còn với người tập gym giảm cân thì lượng calo sẽ giảm xuống từ 50 - 100g trong khẩu phần ăn mỗi ngày. `,
  //     },
  //     {
  //       title: "Khoáng chất và vitamin cần thiết",
  //       image: "",
  //       content:
  //         "Vitamin cùng khoáng chất có nhiều trong hoa quả, rau củ giúp bạn tăng cường hệ miễn dịch, sức đề kháng cho cơ thể. Theo đó, với chế độ ăn cho người tập gym bạn nên bồi bổ vitamin và khoáng chất để phục hồi sức khỏe sau khi luyện tập. ",
  //     },
  //     {
  //       title: " Cung cấp nước cho cơ thể",
  //       image: "",
  //       content: `Nước chiếm tỷ trọng cao trong cơ thể của mỗi người, đặc biệt là trong chế độ ăn cho người tập gym thì nước càng góp phần quan trọng. Bởi vì khi bạn tập luyện với cường độ lớn việc thiếu nước dễ giảm khả năng sinh lực, bị chuột rút. Điều này cũng khó khăn khi bạn tập tạ với cổ họng và miệng khô do không bổ sung nước. Chính vì vậy, bạn nên chú ý khuyến cáo hữu ích từ Học viện Y khoa Thể thao Mỹ dành riêng cho người tập gym như dưới đây:

  //       Trước khi tập luyện: Bạn nên bổ sung 500 ml nước hoặc là ít hơn trước khi tập từ 1 - 2 giờ (tương đương với 2 cốc nước trung bình).
        
  //       Trong quá trình tập: Cứ mỗi 15 - 20 phút, bạn nên bổ sung thêm cho cơ thể 350ml nước (nghĩa là trong 1 giờ tập bạn cần uống 1 lít nước).`,
  //     },
  //     {
  //       title: "Thực phẩm không nên dùng đối với người tập gym",
  //       image: "",
  //       content: `Bên cạnh những thực phẩm cần đảm bảo trong chế độ ăn cho người tập gym thì bạn cũng cần lưu ý một số đồ ăn không tốt như sau:

  //       Đường: Có chứa trong nhiều bánh, kẹo, đồ uống có ga, đồ uống có đường như soda cung cấp nhiều calo nhưng lại không chứa dinh dưỡng tốt.
        
  //       Rượu: Ảnh hưởng xấu cho việc tập luyện, tác động trực tiếp đến xây dựng cơ bắp nếu sử dụng quá nhiều.
        
  //       Đồ ăn nhanh, chiên rán: Có thể kể đến một số đồ ăn chiên rán như khoai tây chiên, cá chiên,... đều có những tác hại xấu cho sức khỏe không tốt khi tập luyện`,
  //     },
  //     {
  //       title: " Gợi ý thực đơn cho người tập gym ",
  //       image: "",
  //       content:
  //         "Để giúp bạn vận dụng linh hoạt những thực phẩm giàu dinh dưỡng, phục vụ tốt cho việc rèn luyện thể hình. Dưới đây là một số gợi ý từ MEDLATEC về thực đơn trong một ngày theo chế độ ăn cho người tập gym để bạn tham khảo: ",
  //     },
  //     {
  //       title: "Bữa sáng",
  //       image: "",
  //       content: `Bữa sáng là một bữa ăn quan trọng trong ngày vì cung cấp năng lượng hoạt động hiệu quả để bắt đầu một ngày mới. Do vậy, bạn không nên bỏ bữa ăn sáng, thực đơn gợi ý được chia ra thành 2 nhóm đối tượng bao gồm:

  //       Với người tập gym tăng cân: Bạn có thể ăn phở bò hoặc phở gà cùng với 1 trái chuối. Ngoài ra, không thể thiếu bổ sung nước cần thiết cho cơ thể khoảng 300ml nước dàn đều buổi sáng. 
        
  //       Với người tập gym giảm cân: Bạn có thể lựa chọn thực phẩm hỗ trợ cải thiện vóc dáng như yến mạch (45g), sữa không đường (300ml) hoặc nước ép táo (200ml) cùng với một thìa mật ong.`,
  //     },
  //     {
  //       title: "Bữa trưa",
  //       image: "",
  //       content: `Người tập gym tăng cân: Bạn nên ăn từ 2 - 3 chén cơm cùng với 200g thịt gà và bổ sung một số loại rau như rau chân vịt, bông cải xanh, bí đỏ (thay đổi theo mỗi bữa ăn) để giúp chế độ ăn cho người tập gym thêm phong phú về lượng dưỡng chất cần thiết.

  //       Người tập gym giảm cân: Với những người cần tập luyện giữ gìn vóc dáng thì nên bổ sung trong khẩu phần ăn như là 200 gam cá hồi hoặc 200g ức gà, các loại hạt (việt quất, mâm xôi, óc chó) cùng trái cây.`,
  //     },
  //     {
  //       title: "Bữa tối",
  //       image: "",
  //       content: `Chế độ ăn cho người tập gym tăng cân: Bạn có thể áp dụng thực đơn như bữa trưa nhưng thay đổi món ăn như là bắp cải cuộn thịt, bò hầm tiêu, canh rau củ sườn non, su su luộc, gà hầm hạt sen,... 

  //       Chế độ ăn cho người tập gym giảm cân: bạn có thể linh hoạt thay đổi món ăn thích hợp cho việc tập luyện như là cá ngừ, các loại rau như xà lách, cà chua, rau bina hoặc cơm gạo lứt, thịt gà nướng. `,
  //     },
  //     {
  //       title: "Thời gian lý tưởng theo chế độ ăn cho người tập gym",
  //       image: "",
  //       content: `Tập luyện thể hình ngoài việc bổ sung dưỡng chất cần thiết, yếu tố thời gian cũng góp phần quan trọng. Sau đây là khung thời gian thích hợp với mỗi chế độ ăn cho người tập gym: 

  //       Ăn sáng trước lúc 8 giờ: Một nguyên tắc chung là bạn không được bỏ bữa sáng trong việc tập luyện vì dễ bị đói lả, làm việc không năng suất. Thời gian thích hợp theo chuyên gia dinh dưỡng để ăn sáng là trước 8 giờ
  //       Ăn trưa trước 12 giờ: Để bổ sung năng lượng tốt nhất cho hoạt động buổi chiều cũng như phục hồi lại cơ thể sau quá trình tập luyện bạn nên bổ sung dưỡng chất cho bữa trưa trước 12 giờ.
  //       Ăn tối trước 19 giờ: Để hạn chế quá trình tích tụ mỡ trong cơ thể, bạn nên cung cấp cho cơ thể dinh dưỡng đảm bảo trước 19 giờ với bữa tối.

  //       Nhìn chung, để đảm bảo chế độ ăn cho người tập gym tăng cân hoặc giảm cân đều áp dụng nguyên tắc chung là cần đủ dinh dưỡng. Bạn nên cân bằng những dưỡng chất cần thiết cho mỗi bữa ăn để giúp quá trình tập luyện đạt hiệu quả cao. `,
  //     },
  //   ],
  // },
  // {
  //   name: "TẬP GYM GIẢM CÂN NHANH KHÔNG? CẦN TRÁNH NHỮNG ĐIỀU GÌ KHI GIẢM CÂN?",
  //   subTitle: "",
  //   image:
  //     "https://medlatec.vn/ImagePath/images/20201223/20201223_tap-gym-giam-can-nhanh-khong-la-dieu-nhieu-nguoi-con-ban-khoan.jpg",
  //   content: [
  //     {
  //     title: "Tập gym giảm cân nhanh không?",
  //       image: "",
  //       content: `Béo có lẽ là nỗi lo day dứt không có hồi kết, dù là nam hay nữ bạn vẫn sẽ cảm thấy tự ti với vòng eo thừa mỡ và mong muốn được sở hữu thân hình thon gọn, săn chắc. Gym là bộ môn rất được giới trẻ yêu thích và sẽ là giải pháp hoàn hảo giúp những đối tượng này cải thiện cân nặng một cách đáng tin cậy.

  //       Với mục đích giảm béo, những buổi tập đầu sẽ khá khó khăn khiến tâm lý ngày càng trì trệ, gây chán nản, liệu trong đầu bạn đã từng nảy sinh ra câu hỏi Tập gym giảm cân nhanh không? Phải làm gì để kết quả được cải thiện nhanh nhất có thể? Chúng tôi xin phép giải đáp rằng vấn đề này còn tùy thuộc ở bạn mà quá trình giảm cân diễn ra nhanh hay chậm. Tập gym còn dựa vào lịch bạn sắp xếp, bài tập bạn chọn, và chế độ ăn uống ra sao,...
  //       Nếu như bạn chăm chỉ tập luyện nhưng đều sai kỹ thuật hoặc không ăn kiêng thì chắc chắn ước mơ giảm cân sẽ rất xa vời. Thế nên hãy tuân thủ quy tắc tập luyện cũng như lựa chọn thực đơn cung cấp sao cho phù hợp nhất để kết quả đạt được tốt nhất.`,
  //     },
  //     {
  //       title: " Lý do không thể giảm cân nhanh",
  //       image: "",
  //       content: `
  //       2.1. Bỏ bữa sáng
  //       Đừng suy nghĩ việc nhịn ăn sáng sẽ làm bạn giảm cân nhanh hơn, đó chính là nguyên nhân khiến cơ thể cần lượng calo nhiều hơn, khiến bạn dễ đói và ăn dồn dập hơn. Điều đó càng làm cho kế hoạch giảm cân trở nên thất bại kèm theo sức khỏe ngày càng giảm sút.
        
  //       2.2. Uống ít nước
  //       Bạn có thể không ăn nhưng không thể nhịn uống nước, vì nước rất quan trọng cho quá trình chuyển đổi chất, giúp đốt số calo không cần thiết. Theo nghiên cứu, bạn nên uống đủ 8 ly nước mỗi ngày để đốt cháy nhiều calo hơn, hãy chăm uống nước lọc trước bữa chính và bữa phụ để cơ thể không bị thiếu nước nhé.
        
  //       2.3. Ăn no và ăn ít
  //       Ăn quá no hoặc ăn quá ít chính là lý do khiến bạn khó giảm cân. Bạn nên chia thức ăn thành nhiều bữa, để quá trình trao đổi chất diễn ra chậm lại và giúp cơ thể đốt cháy nhiều calo hơn.
        
  //       2.4. Không tập luyện chăm chỉ
  //       Chỉ ăn ít mà không tập luyện thì cũng là nguyên nhân gây khó giảm cân, ngược lại còn khiến cơ thể mệt mỏi, thiếu năng lượng, dễ sinh ra các bệnh nguy hiểm.
        
  //       2.5. Sử dụng thuốc giảm cân quá đà
  //       Hiện nay, nhiều người chủ quan sử dụng thuốc giảm cân như một phương pháp giảm cân nhanh chóng. Tuy nhiên, thuốc giảm cân chỉ giúp cơ thể đào thải nước ra ngoài, không giúp giảm mỡ mà còn trì trệ sức khỏe ngày càng đi xuống.`,
  //     },
  //     {
  //       title: "Lịch tập gym hỗ trợ giảm cân",
  //       image: "",
  //       content: `
  //       Để thoát khỏi tình trạng thừa mỡ thì hãy sắp xếp lịch tập một cách hợp lý, tránh trường hợp tập liên tục, quá sức gây ra nhiều ảnh hưởng xấu. Thế nên, nhằm hỗ trợ giảm cân hiệu quả
        
  //       xin mời các bạn tham khảo lịch tập mà chúng tôi đưa ra:
        
  //       Thứ 2: Tập cơ vai.
        
  //       Thứ 3:Tập cơ ngực.
        
  //       Thứ 4: Tập phần chân và bắp chân.
        
  //       Thứ 5: Tập lưng và cơ xô.
        
  //       Thứ 6: Tập cho phần vai, bụng và chân.
        
  //       Thứ 7: Tập tay trước và tay sau.
        
  //       Chủ nhật: Nghỉ ngơi hoặc chọn các bài tập nhẹ nhàng.
        
  //       Đây chỉ là lịch tập chung cho những bạn có nhu cầu, vì lịch tập thay đổi liên tục nên hãy linh động sắp xếp nhé. Không nên tập với cường độ quá cao, hãy bắt đầu với mức tập nhẹ nhất rồi từ từ nâng level lên, để cơ bắp kịp thích nghi để phát triển cân đối nhất có thể.`,
  //     },
  //     {
  //       title: "Chế độ bổ sung dinh dưỡng cho người tập gym giảm cân",
  //       image: "",
  //       content: "Đối với người thừa cân, vấn đề ăn uống cực kỳ quan trọng và đáng được chăm chút. Cho dù bạn ăn kiêng nhưng vẫn phải đảm bảo cung cấp đủ chất dinh dưỡng cần thiết cho cơ thể. Sau đây là thực đơn giảm cân mà bạn nên tham khảo:",
  //     },
  //     {
  //       title: "Lưu ý dành cho người tập gym để giảm cân",
  //       image: "",
  //       content: `Người tập gym sẽ có vài lưu ý cần quan tâm để thực hiện mục đích giảm cân được dễ dàng hơn, cụ thể như sau:

  //       Xác định đúng mục tiêu tập luyện.
        
  //       Sắp xếp lịch tập hợp lý.
        
  //       Khởi động kỹ trước khi bắt đầu tập gym.
        
  //       Chọn mức độ tập luyện vừa với thể lực.
        
  //       Trang phục tập gym thoải mái, thoáng mát, phù hợp.
        
  //       Chế độ ăn uống phải khoa học,...`,
  //     },
  //   ],
  // },
//   {
//     name: "NGƯỜI GẦY CÓ NÊN TẬP GYM KHÔNG? CÁCH TẬP GYM CHUẨN ĐỂ TĂNG CÂN",
//     subTitle: "Rau củ quả và các loại hạt là thực phẩm rất tốt cho sức khỏe",
//     image:
//       "https://medlatec.vn/ImagePath/images/20201212/20201212_nguoi-gay-co-nen-tap-gym-hay-khong-la-thac-mac-cua-nhieu-nguoi.jpg",
//     content: [
//       {
//         title: "Phương pháp tập gym hiệu quả để tăng cân",
//         image: "",
//         content: `Nếu đã biết được câu trả lời người gầy có nên tập gym thì bạn cần bỏ ra thời gian để lập một kế hoạch tập luyện cụ thể cũng như tìm hiểu tất tần tật những phương pháp để quá trình tập gym diễn ra đạt hiệu quả cao.
//         2.1. Chọn bài tập phù hợp
//         Trong gym có rất nhiều bài tập cho từng mục đích khác nhau, khi bắt đầu cần lựa chọn những bài tập vừa phải, không quá nhẹ cũng không quá nặng. Khi đã quen với cường độ luyện tập như thế thì bạn hãy từ từ tăng level lên, không nên quá nóng vội tránh trường hợp ảnh hưởng đến sức khỏe xương khớp và sụt cân hơn ban đầu.
//         \n 2.2. Thực hiện động tác đúng cách
//         Trước khi tập một động tác mới, chúng tôi khuyên bạn hãy nhờ sự hướng dẫn của các huấn luyện viên tại phòng gym để thực hiện một cách chính xác nhất. Khi tập luyện, mỗi động tác bạn nên làm dứt khoát, không ngập ngừng, phải tập thành thạo, quen dần rồi mới bắt đầu chuyển sang động tác khác.
//         Thời gian cho một bài tập tầm 30 phút đến 1 tiếng là hợp lý, tránh tập luyện quá độ gây nên tình trạng thiếu hụt calo, giảm năng lượng hoạt động trong một ngày.
//         Nếu sắp xếp được thì bạn nên tập luyện từ lúc 3 giờ chiều để việc tăng cân diễn ra hiệu quả hơn. (Tùy theo cách bạn tập luyện như thế nào nữa).
//         Chú ý giãn cơ trước và sau buổi tập để giúp cơ kịp thời phục hồi, cố gắng dành ra 15 phút cho việc này.
//         Tập luyện không bỏ ngang hoặc ngắt quãng giữa chừng. Việc bạn nghỉ ngang như vậy sẽ tạo cảm giác chán nản, dễ gây ra tình trạng bỏ tập.
//         2.3. Chế độ bổ sung dinh dưỡng
// Ăn uống đầy đủ dưỡng chất quyết định rất nhiều đến việc tăng cân cho người gầy. Chất dinh dưỡng giúp cơ thể hấp thu thêm nhiều năng lượng, bạn nên cung cấp nhiều đạm qua các loại thực phẩm như: ức gà, thịt bò, hải sản, trứng, rau xanh, các loại đậu,...
// Người tập gym thường có thói quen chia thực đơn thành nhiều buổi nhỏ, việc ăn như vậy sẽ giúp quá trình tiêu hóa diễn ra tích cực hơn. Hãy quan tâm đến chế độ ăn uống của bản thân, tránh tập luyện quá độ dẫn đến mệt mỏi chán ăn, thì lúc đấy mọi công sức bạn bỏ ra đều trở nên vô nghĩa.
// 2.4. Chế độ nghỉ ngơi khoa học
// Một ngày quy định con người chỉ nên bỏ ra 8 tiếng để ngủ, vì việc thiếu ngủ sẽ gây mệt mỏi ảnh hưởng đến quá trình tập luyện. Bạn nên dành thời gian để nghỉ ngơi sau mỗi bài tập, điều này cải thiện rất nhiều đến kết quả bài tập.
// 2.5. Hít thở
// Có thể nói đây chính là yếu tố quan trọng quyết định đến hiệu quả bài tập. Phải đảm bảo rằng việc hít thở phải đúng cách, hít vào bằng mũi và thở ra bằng miệng trong suốt quá trình tập gym.`,
//       },
//       {
//         title: "Người gầy tập gym sẽ mang lại hiệu quả như thế nào?",
//         image: "",
//         content: `Gầy khiến cơ thể bạn khi nhìn vào cảm thấy thiếu sức sống cho dù bạn có đang khỏe mạnh đến mức nào, việc tăng cân nhờ tập gym sẽ giúp bạn có cân nặng vừa ý, ngoài ra còn giúp xua tan mệt mỏi, xả stress, thải mọi độc tố trong cơ thế, giúp giấc ngủ đi sâu hơn,...

//         Người gầy tập gym sẽ mang đến nhiều tác dụng tốt như:
        
//         Cơ hội tăng cân hiếm thấy.
        
//         Ăn uống ngon hơn bình thường, ngủ sâu đủ giấc.
        
//         Quá trình chuyển hóa chất diễn ra tốt hơn.
        
//         Tăng cân mà không lo dư mỡ thừa, phát béo.
        
//         Body dần trở nên nóng bỏng, thu hút.
        
//         Sức khỏe cải thiện, tràn đầy năng lượng tích cực.
        
//         Tinh thần lúc nào cũng thoải mái, dễ chịu, lạc quan hơn.`,
//       },
//       {
//         title: "Lưu ý cho người gầy tập gym để tăng cân",
//         image: "",
//         content: `Trước khi tập luyện không nên nhịn đói, để bụng rỗng, hoặc ăn quá no.

//         Dành ra thời gian hợp lý để nghỉ ngơi giữa các hiệp.
        
//         Không nên tắm ngay sau khi tập vì các tuyến mồ hôi lúc này đang diễn ra tích cực, lỗ chân lông giãn nở, việc tắm lúc cơ thể đang nóng vì đốt cháy năng lượng, khi đó nước lạnh đột ngột sẽ khiến chúng ta dễ bệnh hoặc dẫn đến đột quỵ, khuyên nên tắm bằng nước ấm để thư giãn.
        
//         Không nên ăn ngay sau khi tập, cơ thể mệt mỏi khiến cho thức ăn khó tiêu hơn bình thường, khuyên bạn nên nghỉ ngơi mỗi khi tập luyện xong.
        
//         Ngủ đầy đủ 8 tiếng mỗi ngày để có sức, đầu óc tỉnh táo.
        
//         Không luyện tập quá độ, xếp lịch tập một cách hợp lý, xen kẽ ngày nghỉ để cơ bắp kịp thời phục hồi và phát triển.`,
//       },
      
//     ],
//   },
];

const uploadImage = async (uri: string) => {
  // It won't upload image if image is not change
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const avatarName = uuid.v4() as string;
  const fileRef = ref(firebaseStorage, avatarName);
  await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  const avatarUrl = await getDownloadURL(fileRef);
  return { avatarName, avatarUrl };
};

export const createFood = async () => {
  const foodUpload = foodSample.map(async (food) => {
    const foodDocRef = doc(collection(firebaseDb, "foods"));
    const { avatarUrl } = await uploadImage(food.image!);
    await setDoc(foodDocRef, {
      ...food,
      id: foodDocRef.id,
      image: avatarUrl,
    });
    console.log("created food");
  });
  await Promise.all(foodUpload);
};

export const createExercise = async () => {
  const exerciseUpload = exerciseSample.map(async (exercise) => {
    const exerciseDocRef = doc(collection(firebaseDb, "exercises"));
    const { avatarUrl } = await uploadImage(exercise.image!);
    await setDoc(exerciseDocRef, {
      ...exercise,
      id: exerciseDocRef.id,
      image: avatarUrl,
    });
    console.log("created exercise");
  });
  await Promise.all(exerciseUpload);
};
export const createNews = async () => {
  const newsUpload = newsSample.map(async (news) => {
    const newsDocRef = doc(collection(firebaseDb, "news"));
    const { avatarUrl } = await uploadImage(news.image!);
    await setDoc(newsDocRef, {
      ...news,
      id: newsDocRef.id,
      image: avatarUrl,
    });
    console.log("created news");
  });
  await Promise.all(newsUpload);
};
