import infographicLichSu from '../assets/images/infographic_lich_su_1788524633674.jpg';
import infographicKienTruc from '../assets/images/infographic_kien_truc_1788524648384.jpg';
import infographicThuongMai from '../assets/images/infographic_thuong_mai_1788524661605.jpg';
import infographicSangTao from '../assets/images/infographic_sang_tao_1788524677515.jpg';
import infographicBienDoThi from '../assets/images/infographic_bien_do_thi_1788524692278.jpg';
import infographicCuChi from '../assets/images/infographic_cu_chi_cutaway_1788526428323.jpg';
import infographicDinhDocLap from '../assets/images/infographic_dinh_doc_lap_1788526450322.jpg';
import infographicNhaThoDucBa from '../assets/images/infographic_nha_tho_duc_ba_1788526470866.jpg';
import infographicDonCaTaiTu from '../assets/images/infographic_don_ca_tai_tu_1788526493027.jpg';
import infographicBuuDien from '../assets/images/infographic_buu_dien_1788947680396.jpg';
import { PLACE_IMAGES } from '../utils/mediaFallback';

export interface InfographicHotspot {
  id: number;
  x: number; // Percentage 0 - 100%
  y: number; // Percentage 0 - 100%
  title: string;
  category: 'Kiến trúc' | 'Lịch sử' | 'Kỹ thuật' | 'Văn hóa' | 'Cảnh quan' | 'Thương mại';
  description: string;
  tag?: string;
}

export interface BlueprintData {
  orientation: string;
  materials: string[];
  scale: string;
  architecturalStyle: string;
  gridCoords: string;
  crossSectionNote?: string;
}

export interface ColorMeaning {
  hex: string;
  name: string;
  percentage: number;
  meaning: string;
}

export interface PlaceInfographicMeta {
  placeName: string;
  category: 'lich_su' | 'kien_truc' | 'thuong_mai' | 'sang_tao' | 'bien_do_thi';
  categoryTitle: string;
  masterImage: string;
  yearEstablished: string;
  heritageAgeYears?: number;
  significanceLevel?: string;
  architectOrOrigin: string;
  keyClassification: string;
  dimensionsOrScale: string;
  colorPalette: string[];
  colorMeanings?: ColorMeaning[];
  hotspots?: InfographicHotspot[];
  blueprint?: BlueprintData;
  aiImagePrompt: string;
  milestones: { year: string; event: string; tag?: string }[];
  visualHighlights: string[];
  keyDataPoints: { label: string; value: string }[];
  pedagogicalTakeaways: string[];
}

export const PLACE_INFOGRAPHICS: Record<string, PlaceInfographicMeta> = {
  "Bến Nhà Rồng": {
    placeName: "Bến Nhà Rồng",
    category: "lich_su",
    categoryTitle: "Không gian Lịch sử & Ký ức Đô thị",
    masterImage: infographicLichSu,
    yearEstablished: "1862 – 1863",
    architectOrOrigin: "Hãng vận tải Messageries Impériales (Pháp)",
    keyClassification: "Di tích Lịch sử cấp Quốc gia • Bảo tàng Hồ Chí Minh",
    dimensionsOrScale: "Mặt tiền hướng sông Sài Gòn, kiến trúc 2 tầng phong cách Pháp",
    colorPalette: ["#c29b38", "#8b0000", "#1a2a44", "#f4ecd8"],
    aiImagePrompt: "A high-resolution educational museum infographic poster of Ben Nha Rong Dragon Wharf, Ho Chi Minh City. Detailed architectural illustration of the French colonial rooftop with twin ceramic dragon statues, Saigon riverfront at dusk, 1911 historic journey timeline node, data badges, vintage parchment and royal navy blue tones, professional infographics layout.",
    milestones: [
      { year: "1863", event: "Khánh thành trụ sở Hãng tàu Messageries Impériales tại ngã ba sông Sài Gòn" },
      { year: "05/06/1911", event: "Nguyễn Tất Thành lên tàu Amiral Latouche Tréville ra đi tìm đường cứu nước" },
      { year: "1979", event: "Chuyển giao thành Khu lưu niệm Bác Hồ và sau này là Bảo tàng Hồ Chí Minh" },
      { year: "Hiện nay", event: "Lưu giữ hàng nghìn hiện vật quý giá giáo dục truyền thống cho thế hệ trẻ" }
    ],
    visualHighlights: [
      "Đôi rồng đất nung tráng men xanh châu đầu ngậm châu ngọc trên nóc dinh thự",
      "Vòm cửa vòng cung kiểu Roman hài hòa với khí hậu nhiệt đới gió mùa Nam Bộ",
      "Vị trí chiến lược soi bóng xuống ngã ba sông Sài Gòn và kênh Bến Nghé"
    ],
    keyDataPoints: [
      { label: "Mốc khởi thủy", value: "Năm 1863" },
      { label: "Sự kiện cốt lõi", value: "05/06/1911" },
      { label: "Hiện vật trưng bày", value: "Hơn 20.000 tư liệu" },
      { label: "Phân loại", value: "Bảo tàng Quốc gia" }
    ],
    pedagogicalTakeaways: [
      "Hiểu rõ vai trò vị trí cửa ngõ sông nước của Sài Gòn trong việc giao thương quốc tế đầu thế kỷ 20.",
      "Ghi nhớ dấu mốc ngày 5/6/1911 là bước ngoặt quyết định của phong trào giải phóng dân tộc Việt Nam."
    ]
  },
  "DINH ĐỘC LẬP": {
    placeName: "DINH ĐỘC LẬP",
    category: "lich_su",
    categoryTitle: "Không gian Lịch sử & Ký ức Đô thị",
    masterImage: infographicLichSu,
    yearEstablished: "1962 – 1966",
    architectOrOrigin: "KTS Ngô Viết Thụ (Giải Khôi nguyên La Mã)",
    keyClassification: "Di tích Quốc gia Đặc biệt (2009)",
    dimensionsOrScale: "Khuôn viên 12 hecta, diện tích sử dụng 20.000 m², hơn 100 phòng",
    colorPalette: ["#c29b38", "#2d4a22", "#d97706", "#0f172a"],
    aiImagePrompt: "A minimalist modern architectural educational infographic poster of Independence Palace Saigon (Dinh Doc Lap). Front facade elevation drawing showing the stylized bamboo curtain (rèm hoa đá), rooftop helipad, Eastern philosophical character layout (Cát, Khẩu, Trung, Tam, Chủ), timeline of 30/4/1975 tank entry, architectural floor plans, high contrast gold and deep green.",
    milestones: [
      { year: "1962", event: "Khởi công xây dựng lại theo đồ án thiết kế của KTS Ngô Viết Thụ" },
      { year: "1966", event: "Lễ khánh thành chính thức Dinh Độc Lập hiện đại" },
      { year: "30/04/1975", event: "Xe tăng 390 và 843 húc đổ cổng chính, kết thúc thắng lợi Chiến dịch Hồ Chí Minh" },
      { year: "2009", event: "Chính phủ xếp hạng Di tích Quốc gia Đặc biệt" }
    ],
    visualHighlights: [
      "Bức rèm hoa đá hình gióng trúc bao bọc tầng hai chống chói và lấy gió mát tự nhiên",
      "Bố cục bình đồ kiến trúc chiết tự chữ Hán: Cát (may mắn), Khẩu (tự do ngôn luận), Trung (trung thực)",
      "Hệ thống hầm ngầm kiên cố chịu được bom đạn hạng nặng với trung tâm thông tin liên lạc"
    ],
    keyDataPoints: [
      { label: "Diện tích khuôn viên", value: "12 ha" },
      { label: "Số phòng chức năng", value: "Hơn 100 phòng" },
      { label: "Xếp hạng di tích", value: "Quốc gia đặc biệt" },
      { label: "Mốc lịch sử đại thắng", value: "30/04/1975" }
    ],
    pedagogicalTakeaways: [
      "Đánh giá cao sự kết hợp tài tình giữa kiến trúc hiện đại phương Tây và triết lý phương Đông của KTS Ngô Viết Thụ.",
      "Hiểu ý nghĩa biểu tượng của ngày 30/4/1975 đối với hòa bình, thống nhất non sông."
    ]
  },
  "ĐỊA ĐẠO CỦ CHI-TPHCM": {
    placeName: "ĐỊA ĐẠO CỦ CHI-TPHCM",
    category: "lich_su",
    categoryTitle: "Không gian Lịch sử & Ký ức Đô thị",
    masterImage: infographicLichSu,
    yearEstablished: "1946 – 1968",
    architectOrOrigin: "Quân và dân Huyện Củ Chi tự đào thủ công",
    keyClassification: "Di tích Quốc gia Đặc biệt (2015)",
    dimensionsOrScale: "Chiều dài hơn 250km, kết cấu ngầm 3 tầng chịu được bom B-52",
    colorPalette: ["#854d0e", "#15803d", "#c29b38", "#1c1917"],
    aiImagePrompt: "An underground sectional cross-section infographic diagram of Cu Chi Tunnels network. Visual cutaway revealing 3 subterranean layers down to 12 meters, Hoang Cam smokeless kitchen diagram, concealed termite mound air vents, meeting rooms, trapdoors, rustic clay earth palette with golden educational labels.",
    milestones: [
      { year: "1946 – 1948", event: "Những mét hầm bí mật đầu tiên được đào tại xã Tân Phú Trung và Phước Vĩnh An" },
      { year: "1961 – 1965", event: "Phát triển thành hệ thống địa đạo liên hoàn 'làng hầm' dài 250km" },
      { year: "1966 – 1967", event: "Đánh bại các chiến dịch càn quét quy mô lớn như Crimp và Cedar Falls" },
      { year: "2015", event: "Được Thủ tướng Chính phủ xếp hạng Di tích Quốc gia Đặc biệt" }
    ],
    visualHighlights: [
      "Mô hình cắt ngang 3 tầng ngầm: Tầng 1 (cách mặt đất 3m), Tầng 2 (cách 6m), Tầng 3 (sâu 12m)",
      "Bếp Hoàng Cầm với hệ thống rãnh tán khói trong lòng đất không để lộ vị trí",
      "Lỗ thông hơi ngụy trang tài tình dưới các gò mối và gốc cây rừng nhiệt đới"
    ],
    keyDataPoints: [
      { label: "Tổng chiều dài", value: "> 250 km" },
      { label: "Độ sâu tối đa", value: "12 mét ngầm" },
      { label: "Khả năng chịu lực", value: "Bom B-52 công phá" },
      { label: "Điểm tham quan chính", value: "Bến Dược & Bến Đình" }
    ],
    pedagogicalTakeaways: [
      "Thấu hiểu ý chí bất khuất và tinh thần sáng tạo phi thường của chiến tranh nhân dân Việt Nam.",
      "Bài học về việc biến điều kiện tự nhiên đất sét pha đá ong thành thành lũy kiên cố."
    ]
  },
  "NHÀ TÙ CÔN ĐẢO": {
    placeName: "NHÀ TÙ CÔN ĐẢO",
    category: "lich_su",
    categoryTitle: "Không gian Lịch sử & Ký ức Đô thị",
    masterImage: infographicLichSu,
    yearEstablished: "1862 – 1975",
    architectOrOrigin: "Chính quyền thực dân Pháp và chính quyền Sài Gòn",
    keyClassification: "Di tích Quốc gia Đặc biệt (2012)",
    dimensionsOrScale: "Gồm 8 trại giam chính, 2 khu biệt lập, Chuồng Cọp Pháp & Chuồng Cọp Mỹ",
    colorPalette: ["#475569", "#c29b38", "#991b1b", "#0f172a"],
    aiImagePrompt: "A somber, respectful historical infographic poster of Con Dao Prison historical site. Cutaway diagram of the secret Tiger Cages (Chuong Cop), stone prison walls, Hang Duong cemetery memorial with Vo Thi Sau tribute, timeline from 1862 to 1975, restrained high-contrast editorial design with gold and stone grey accents.",
    milestones: [
      { year: "1862", event: "Thống đốc Bonard ký quyết định thành lập ngục Côn Đảo đày ải nghĩa sĩ" },
      { year: "1940", event: "Xây dựng hệ thống Chuồng Cọp Pháp bí mật với 120 phòng giam biệt lập" },
      { year: "1970", event: "Tội ác bí mật 'Chuồng Cọp Côn Đảo' bị phanh phui trước dư luận thế giới" },
      { year: "2012", event: "Chính thức được xếp hạng Di tích Quốc gia Đặc biệt" }
    ],
    visualHighlights: [
      "Khu Chuồng Cọp với song sắt phía trên để cai ngục tra tấn tù nhân từ sàn thao tác",
      "Hầm phân bò sâu 3m và các xà lim đá tăm tối biệt giam những chiến sĩ kiên trung",
      "Nghĩa trang Hàng Dương với hàng nghìn ngôi mộ liệt sĩ và mộ nữ anh hùng Võ Thị Sáu"
    ],
    keyDataPoints: [
      { label: "Thời gian tồn tại", value: "113 năm (1862-1975)" },
      { label: "Số lượng phòng giam", value: "504 xà lim biệt lập" },
      { label: "Quy mô hệ thống", value: "8 trại giam lớn" },
      { label: "Danh hiệu", value: "Trường học cách mạng" }
    ],
    pedagogicalTakeaways: [
      "Khắc sâu lòng biết ơn vô hạn trước sự hy sinh xương máu của các bậc tiền nhân cách mạng.",
      "Nhận thức giá trị vô giá của nền độc lập tự do mà dân tộc đang thụ hưởng ngày nay."
    ]
  },
  "BƯU ĐIỆN TRUNG TÂM TPHCM": {
    placeName: "BƯU ĐIỆN TRUNG TÂM TPHCM",
    category: "kien_truc",
    categoryTitle: "Không gian Kiến trúc & Tín ngưỡng",
    masterImage: infographicBuuDien,
    yearEstablished: "1886 – 1891",
    architectOrOrigin: "KTS Marie-Alfred Foulhoux (thiết kế tổng thể) • Kỹ sư Gustave Eiffel (hệ kết cấu vòm sắt)",
    keyClassification: "Di tích Kiến trúc Nghệ thuật cấp Quốc gia (Quyết định số 4099/QĐ-BVHTTDL năm 2014)",
    dimensionsOrScale: "Mặt tiền màu vàng thổ hoàng tráng lệ đối diện Nhà thờ Đức Bà, đại sảnh vòm cuốn dài hơn 60m",
    colorPalette: ["#c29b38", "#15803d", "#1e3a8a", "#f8fafc"],
    colorMeanings: [
      { hex: "#c29b38", name: "Vàng thổ hoàng", percentage: 45, meaning: "Sắc màu biểu tượng của kiến trúc thuộc địa Pháp thế kỷ XIX, tượng trưng cho sự thịnh vượng và trường tồn." },
      { hex: "#15803d", name: "Xanh lá cây cổ điển", percentage: 25, meaning: "Màu sơn truyền thống của hệ thống cửa chớp gỗ, cửa vòm sắt uốn và mặt đồng hồ trung tâm." },
      { hex: "#1e3a8a", name: "Xanh dương hải quân", percentage: 15, meaning: "Đại diện cho mạng lưới viễn thông, bưu chính đường biển và hai bức bản đồ cổ vẽ tay năm 1892 & 1936." },
      { hex: "#f8fafc", name: "Trắng vôi thạch cao", percentage: 15, meaning: "Hệ thống phào chỉ, hoa văn phù điêu trang trí phong cách Phục Hưng kết hợp mỹ thuật Á Đông." }
    ],
    aiImagePrompt: "A museum-grade architectural infographic poster of Bưu điện Trung tâm TPHCM (Saigon Central Post Office). Detailed neoclassical yellow ochre facade with giant green clock, cross-section technical diagram of Gustave Eiffel vaulted iron beam structure, two large hand-painted antique maps of South Vietnam telecom lines, antique wooden telephone booths and post boxes, elegant gold labels and typography.",
    milestones: [
      { year: "1886", event: "Khởi công xây dựng trụ sở bưu chính quy mô hiện đại hàng đầu Đông Nam Á do KTS Foulhoux thiết kế" },
      { year: "1891", event: "Chính thức khánh thành vào ngày 22/03/1891, đưa vào vận hành mạng lưới bưu chính - viễn thông xuyên lục địa" },
      { year: "2014", event: "Bộ Văn hóa, Thể thao và Du lịch xếp hạng là Di tích Kiến trúc Nghệ thuật cấp Quốc gia" },
      { year: "Hiện nay", event: "Hơn 135 năm hoạt động bền bỉ, vừa phục vụ bưu chính công cộng vừa là biểu tượng di sản trung tâm TP.HCM" }
    ],
    visualHighlights: [
      "Mặt tiền màu vàng thổ hoàng với đồng hồ tròn cổ điển và các ô biển khắc tên các nhà khoa học vĩ đại ngành điện học (Ampère, Ohm, Faraday, Morse, Volta...)",
      "Đại sảnh vòm cuốn hình bán nguyệt dài hơn 60m nâng đỡ bởi hệ cột sắt rèn uốn lượn chịu lực tinh xảo của Gustave Eiffel",
      "Hai bức bản đồ lịch sử khổ lớn vẽ tay năm 1892 & 1936 ghi lại mạng lưới điện báo viễn thông Nam Kỳ và Sài Gòn xưa",
      "Dãy buồng điện thoại công cộng bằng gỗ tếch cổ điển và hòm thư bưu chính nguyên bản duy trì suốt hơn 1 thế kỷ"
    ],
    keyDataPoints: [
      { label: "Năm khánh thành", value: "22/03/1891" },
      { label: "Kiến trúc sư", value: "Marie-Alfred Foulhoux" },
      { label: "Phong cách", value: "Tân cổ điển giao thoa Á - Âu" },
      { label: "Kỹ sư vòm sắt", value: "Gustave Eiffel" },
      { label: "Xếp hạng di tích", value: "Quốc gia (2014)" },
      { label: "Chiều dài đại sảnh", value: "Hơn 60 mét" },
      { label: "Địa chỉ", value: "Số 2 Công xã Paris, Q.1" }
    ],
    pedagogicalTakeaways: [
      "Khảo cứu sự giao thoa độc đáo giữa kỹ thuật kết cấu kim loại công nghiệp phương Tây thế kỷ 19 với nghệ thuật trang trí phù điêu và hoa văn phương Đông.",
      "Thấu hiểu ý nghĩa của một di sản sống (living heritage) vẫn giữ nguyên vẹn công năng bưu chính dân sinh phục vụ đồng bào và du khách sau hơn một thế kỷ."
    ]
  },
  "BƯU ĐIỆN TRUNG TÂM SÀI GÒN": {
    placeName: "BƯU ĐIỆN TRUNG TÂM TPHCM",
    category: "kien_truc",
    categoryTitle: "Không gian Kiến trúc & Tín ngưỡng",
    masterImage: infographicBuuDien,
    yearEstablished: "1886 – 1891",
    architectOrOrigin: "KTS Marie-Alfred Foulhoux (thiết kế) • Gustave Eiffel (hệ khung sắt)",
    keyClassification: "Di tích Kiến trúc Nghệ thuật cấp Quốc gia",
    dimensionsOrScale: "Mặt tiền màu vàng thổ hoàng đặc trưng, tiền sảnh dài hơn 60m",
    colorPalette: ["#c29b38", "#15803d", "#1e3a8a", "#f8fafc"],
    aiImagePrompt: "An architectural blueprint infographic illustration of Saigon Central Post Office. Showing the iconic neoclassical facade with central giant clock, the sweeping arched iron vault ceiling engineered by Gustave Eiffel, antique wooden telephone booths, hand-painted historical maps on lobby walls, clean gold and terracotta palette.",
    milestones: [
      { year: "1886", event: "Khởi công xây dựng công trình bưu chính quy mô lớn nhất Đông Dương thời bấy giờ" },
      { year: "1891", event: "Chính thức khánh thành và đưa vào vận hành bưu chính - viễn thông" },
      { year: "Hơn 135 năm", event: "Duy trì liên tục chức năng phục vụ bưu chính công cộng và đón khách quốc tế" }
    ],
    visualHighlights: [
      "Mái vòm bán nguyệt lợp ngói được nâng đỡ bởi bốn trụ sắt đồ sộ uốn lượn phong cách Eiffel",
      "Hai bản đồ lịch sử vẽ tay trên tường sảnh: Bản đồ viễn thông Nam Kỳ và Sài Gòn xưa",
      "Hàng bốt điện thoại công cộng bằng gỗ cổ điển tồn tại qua hơn một thế kỷ"
    ],
    keyDataPoints: [
      { label: "Năm khánh thành", value: "22/03/1891" },
      { label: "Phong cách", value: "Phục Hưng & Gothic" },
      { label: "Kỹ sư kết cấu vòm", value: "Gustave Eiffel" },
      { label: "Màu sơn đặc trưng", value: "Vàng thổ hoàng" }
    ],
    pedagogicalTakeaways: [
      "Nhận diện nét giao thoa văn hóa giữa kỹ thuật công nghiệp châu Âu thế kỷ 19 và mỹ thuật trang trí phương Đông.",
      "Ý thức bảo tồn những công trình kiến trúc cổ vẫn đang giữ vững công năng sử dụng đương đại."
    ]
  },
  "CHÙA HỘI KHÁNH-BÌNH DƯƠNG": {
    placeName: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG",
    category: "kien_truc",
    categoryTitle: "Không gian Kiến trúc & Tín ngưỡng",
    masterImage: infographicKienTruc,
    yearEstablished: "1741",
    architectOrOrigin: "Thiền sư Đại Ngạn (khai sơn) • Hệ phái Bắc Tông Nam Bộ",
    keyClassification: "Di tích Lịch sử - Văn hóa cấp Quốc gia (1993)",
    dimensionsOrScale: "Tượng Đức Phật Thích Ca nhập niết bàn dài 52m, cao 12m nằm trên nóc chùa",
    colorPalette: ["#c29b38", "#78350f", "#b45309", "#0c121e"],
    aiImagePrompt: "An infographic cultural poster of Hoi Khanh Pagoda Binh Duong. Showing the record-breaking 52-meter reclining Buddha statue on temple rooftop, intricately carved wooden dragon pillars, traditional Southern Vietnamese multi-roof pagoda layout, ancient bronze bells, peaceful lotus garden aesthetics with gold editorial labels.",
    milestones: [
      { year: "1741", event: "Được khởi dựng ban đầu trên đồi cao thời chúa Nguyễn Phúc Khoát" },
      { year: "1868", event: "Chùa bị hỏa hoạn và được tái thiết tại vị trí chân đồi hiện nay" },
      { year: "1993", event: "Bộ Văn hóa Thông tin công nhận là Di tích Lịch sử - Văn hóa Quốc gia" },
      { year: "2013", event: "Xác lập kỷ lục Tượng Phật nhập niết bàn trên mái chùa dài nhất châu Á" }
    ],
    visualHighlights: [
      "Tượng Phật nằm trên mái dài 52m với 52 đệ tử hoa sen biểu trưng cho giáo lý đại thừa",
      "Bộ bao lam chạm trổ Tứ linh, Tứ quý bằng gỗ quý của các nghệ nhân chạm khắc Bình Dương cổ",
      "Khu tháp tổ cổ kính rợp bóng cây đại thụ hàng trăm năm tuổi"
    ],
    keyDataPoints: [
      { label: "Niên đại", value: "Khởi dựng 1741" },
      { label: "Chiều dài tượng Phật", value: "52 mét (Kỷ lục châu Á)" },
      { label: "Chất liệu điêu khắc", value: "Gỗ quý chạm lọng" },
      { label: "Xếp hạng", value: "Di tích Quốc gia 1993" }
    ],
    pedagogicalTakeaways: [
      "Khám phá nghệ thuật điêu khắc gỗ truyền thống trứ danh của vùng đất Thủ Dầu Một - Bình Dương.",
      "Tìm hiểu sự đồng hành của Phật giáo Nam Bộ trong công cuộc khai hoang mở cõi và kháng chiến giữ nước."
    ]
  },
  "THÍCH CA PHẬT ĐÀI-VŨNG TÀU": {
    placeName: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU",
    category: "kien_truc",
    categoryTitle: "Không gian Kiến trúc & Tín ngưỡng",
    masterImage: infographicKienTruc,
    yearEstablished: "1961 – 1963",
    architectOrOrigin: "Hội đồng Phật giáo Nguyên thủy Nam Tông",
    keyClassification: "Di tích Lịch sử - Văn hóa cấp Quốc gia (1989)",
    dimensionsOrScale: "Quần thể rộng 28 hecta trên sườn Núi Lớn nhìn ra vịnh biển",
    colorPalette: ["#c29b38", "#0284c7", "#e0e7ff", "#0f172a"],
    aiImagePrompt: "An educational religious architecture infographic poster of Thich Ca Phat Dai Vung Tau. Visual mountain slope diagram showing the progression of Buddha's life stages (Birth, Renunciation, Enlightenment, Parinirvana), the massive white meditating Buddha statue against coastal blue sky, octagonal relic stupa, lotus pedestal details.",
    milestones: [
      { year: "1961", event: "Khởi công xây dựng quần thể tái hiện cuộc đời Đức Phật trên sườn Núi Lớn" },
      { year: "1963", event: "Khánh thành pho tượng Thích Ca Mâu Ni tọa thiền trên tòa sen cao 10.2m" },
      { year: "1989", event: "Được công nhận Di tích Lịch sử - Văn hóa cấp Quốc gia" }
    ],
    visualHighlights: [
      "Pho tượng Phật tọa thiền màu trắng tinh khôi hướng mặt về biển khơi lộng gió",
      "Bảo tháp xá lợi hình bát giác cao 17m chứa ngọc xá lợi Phật do phái đoàn Tích Lan trao tặng",
      "Không gian cảnh quan tự nhiên phân tầng theo triết lý giải thoát và hòa hợp thiên nhiên"
    ],
    keyDataPoints: [
      { label: "Diện tích quần thể", value: "28 hecta" },
      { label: "Chiều cao tượng Phật", value: "10.2 mét (Tòa sen 3.7m)" },
      { label: "Địa thế", value: "Sườn Núi Lớn Vũng Tàu" },
      { label: "Năm công nhận", value: "1989" }
    ],
    pedagogicalTakeaways: [
      "Nhận biết sự kết hợp hài hòa giữa kiến trúc Phật giáo nguyên thủy và cảnh quan sơn thủy Vũng Tàu.",
      "Học cách đọc sơ đồ không gian phân tầng tái hiện tiến trình cuộc đời nhân vật lịch sử - tôn giáo."
    ]
  },
  "NHÀ THỜ ĐỨC BÀ SÀI GÒN": {
    placeName: "NHÀ THỜ ĐỨC BÀ SÀI GÒN",
    category: "kien_truc",
    categoryTitle: "Không gian Kiến trúc & Tín ngưỡng",
    masterImage: infographicKienTruc,
    yearEstablished: "1877 – 1880",
    architectOrOrigin: "KTS Jules Bourard (Pháp) theo phong cách Tân La Mã & Gothic",
    keyClassification: "Vương cung Thánh đường • Biểu tượng di sản kiến trúc TP.HCM",
    dimensionsOrScale: "Chiều dài 93m, rộng 35m, 2 tháp chuông đỉnh nhọn cao 60.5m",
    colorPalette: ["#b91c1c", "#c29b38", "#334155", "#fef2f2"],
    aiImagePrompt: "A high-precision architectural infographic cutaway of Saigon Notre Dame Cathedral. Diagram showing the twin 60.5m bell towers with spire crosses, red Marseille terracotta brick construction without plaster, rose stained-glass windows, bronze statue of Our Lady of Peace in square, elegant red-brick and gold design language.",
    milestones: [
      { year: "1877", event: "Giám mục Colombert đặt viên đá đầu tiên khởi công công trình" },
      { year: "1880", event: "Lễ khánh thành nhân dịp lễ Phục Sinh với tên gọi Nhà thờ Nhà Nước" },
      { year: "1895", event: "Lắp dựng thêm 2 đỉnh nhọn bọc kẽm đưa chiều cao tháp chuông lên 60.5m" },
      { year: "1959", event: "Tòa Thánh Vatican phong hiệu Vương cung Thánh đường (Basilica)" }
    ],
    visualHighlights: [
      "Toàn bộ gạch đỏ xây tường được nhập khẩu trực tiếp từ Marseille, không trát vữa nhưng không bám rêu mốc",
      "Bộ 6 quả chuông bằng đồng đúc tại Pháp nặng tổng cộng gần 30 tấn vang xa khắp thành phố",
      "Tượng Đức Mẹ Hòa Bình bằng đá cẩm thạch trắng Carrara (Ý) đặt tại quảng trường công viên"
    ],
    keyDataPoints: [
      { label: "Chiều cao tháp chuông", value: "60.5 mét" },
      { label: "Xuất xứ gạch xây", value: "Marseille (Pháp)" },
      { label: "Bộ chuông đồng", value: "6 quả nặng gần 30 tấn" },
      { label: "Danh hiệu", value: "Vương cung Thánh đường 1959" }
    ],
    pedagogicalTakeaways: [
      "Hiểu về kỹ thuật xây dựng bền vững xuyên thế kỷ và giải pháp liên kết kết cấu gạch vôi cổ điển.",
      "Tôn trọng và có ý thức giữ gìn di sản kiến trúc đa tôn giáo trong dòng chảy văn hóa đô thị TP.HCM."
    ]
  },
  "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG": {
    placeName: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG",
    category: "thuong_mai",
    categoryTitle: "Không gian Thương mại & Đời sống Cộng đồng",
    masterImage: infographicThuongMai,
    yearEstablished: "1935",
    architectOrOrigin: "Chính quyền thời Pháp thuộc thiết kế theo phong cách Art Deco",
    keyClassification: "Di tích Kiến trúc Nghệ thuật cấp Tỉnh (2007)",
    dimensionsOrScale: "Tháp đồng hồ cao vút 4 mặt nhìn ra ngã tư trung tâm và bến đò sông Sài Gòn",
    colorPalette: ["#c29b38", "#0369a1", "#f59e0b", "#1e293b"],
    aiImagePrompt: "A vibrant commercial heritage infographic of Thu Dau Mot Market Binh Duong. Showing the prominent French Art Deco clock tower, bustling riverside market stalls, ceramic trade boats docked along Saigon River, historical milestones since 1935, warm golden hour palette with editorial infographic typography.",
    milestones: [
      { year: "1935", event: "Xây dựng ngôi chợ kiên cố bằng bê tông cốt thép thay thế chợ bến cũ" },
      { year: "Thế kỷ 20", event: "Trung tâm giao thương gốm sứ, sơn mài và nông sản lớn nhất miền Đông Nam Bộ" },
      { year: "2007", event: "Được công nhận Di tích Lịch sử - Văn hóa Kiến trúc Nghệ thuật" }
    ],
    visualHighlights: [
      "Tháp đồng hồ hình bát giác mang phong cách Art Deco vươn cao đặc trưng biểu tượng đất Thủ",
      "Vị trí 'trên bến dưới thuyền' kết nối trực tiếp với tuyến đường thủy sông Sài Gòn",
      "Các sạp hàng buôn bán gốm Lái Thiêu, guốc mộc và ẩm thực Bình Dương truyền thống"
    ],
    keyDataPoints: [
      { label: "Năm hoàn thành", value: "1935" },
      { label: "Đặc trưng biểu tượng", value: "Tháp đồng hồ Art Deco" },
      { label: "Lợi thế vị trí", value: "Giao lộ 'trên bến dưới thuyền'" },
      { label: "Mặt hàng thế mạnh", value: "Gốm sứ, sơn mài, nông sản" }
    ],
    pedagogicalTakeaways: [
      "Hiểu được cơ chế hình thành các trung tâm buôn bán cổ gắn với mạng lưới sông ngòi Nam Bộ.",
      "Tìm hiểu về văn hóa thương nghiệp thị dân của vùng đất Bình Dương trù phú."
    ]
  },
  "CHỢ BẾN THÀNH": {
    placeName: "CHỢ BẾN THÀNH",
    category: "thuong_mai",
    categoryTitle: "Không gian Thương mại & Đời sống Cộng đồng",
    masterImage: infographicThuongMai,
    yearEstablished: "1912 – 1914",
    architectOrOrigin: "Hãng thầu Brossard et Maupin xây dựng",
    keyClassification: "Biểu tượng văn hóa đô thị & Thương mại lịch sử TP.HCM",
    dimensionsOrScale: "Diện tích hơn 13.000 m², 4 cửa chính Đông - Tây - Nam - Bắc, gần 1.500 sạp",
    colorPalette: ["#c29b38", "#ea580c", "#0f172a", "#fef3c7"],
    aiImagePrompt: "An iconic educational infographic poster of Ben Thanh Market Saigon. Isometric cutaway showing the 4 main gates (East, West, South, North) with ceramic relief murals, the iconic South Gate clock tower, layout of 1500 market stalls, textile, coffee and handicraft zones, warm lively market palette.",
    milestones: [
      { year: "1912", event: "Khởi công xây dựng Chợ Mới trên vùng đầm lầy Bồ Rệp sau khi chợ cũ bị cháy" },
      { year: "1914", event: "Khánh thành chợ với lễ hội pháo hoa rực rỡ kéo dài 3 ngày đêm" },
      { year: "1985", event: "Đợt đại trùng tu chỉnh trang giữ nguyên vẹn tháp chuông và kiến trúc lõi" },
      { year: "Hiện nay", event: "Đón ga ngầm tuyến Metro số 1 Bến Thành - Suối Tiên" }
    ],
    visualHighlights: [
      "Tháp đồng hồ Cửa Nam 3 tầng mái ngói đỏ - hình ảnh đại diện thương hiệu du lịch TP.HCM",
      "12 bức phù điêu gốm Biên Hòa gắn trên các cửa chợ khắc họa sản vật trù phú của miền Nam",
      "Hệ thống khung vì kèo thép mái dốc lớn thoát nhiệt tự nhiên thích nghi khí hậu nhiệt đới"
    ],
    keyDataPoints: [
      { label: "Năm khánh thành", value: "1914" },
      { label: "Số lượng sạp hàng", value: "~ 1.500 sạp" },
      { label: "Quy mô diện tích", value: "> 13.000 m²" },
      { label: "Số cửa đón khách", value: "4 cửa chính, 12 cửa phụ" }
    ],
    pedagogicalTakeaways: [
      "Khám phá sự dịch chuyển kinh tế và quy hoạch đô thị Sài Gòn đầu thế kỷ 20.",
      "Hiểu giá trị biểu tượng của ngôi chợ vừa là di sản kiến trúc, vừa là bảo tàng sống về đời sống thị dân."
    ]
  },
  "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH": {
    placeName: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH",
    category: "thuong_mai",
    categoryTitle: "Không gian Thương mại & Đời sống Cộng đồng",
    masterImage: infographicThuongMai,
    yearEstablished: "2016",
    architectOrOrigin: "UBND TP.HCM phối hợp cùng Hội đồng Xuất bản Việt Nam",
    keyClassification: "Không gian Văn hóa Đọc & Tri thức Công cộng Đô thị",
    dimensionsOrScale: "Chiều dài hơn 100m, hơn 20 gian hàng nhà xuất bản, rợp bóng cây me cổ thụ",
    colorPalette: ["#15803d", "#c29b38", "#ca8a04", "#0f172a"],
    aiImagePrompt: "A fresh, inspiring educational infographic poster of Nguyen Van Binh Book Street Saigon. Perspective view through tree canopies framing wooden open-air book kiosks, student reading cafe corners, book launch event stage, historical plaques, warm wooden and lush leaf green palette.",
    milestones: [
      { year: "2016", event: "Chính thức khánh thành tuyến đường sách phức hợp đầu tiên tại Việt Nam" },
      { year: "2016 – Nay", event: "Tổ chức hàng nghìn buổi giao lưu tác giả, triển lãm văn hóa và hội họa" }
    ],
    visualHighlights: [
      "Không gian đi bộ thanh bình dài hơn 100 mét kẹp giữa Nhà thờ Đức Bà và Bưu điện Trung tâm",
      "Hơn 20 gian hàng sách bằng gỗ kính mở thân thiện với thiên nhiên dưới tán cây me",
      "Sân khấu trung tâm tổ chức các buổi tọa đàm sách, triển lãm thư pháp và ngày hội sách thiếu nhi"
    ],
    keyDataPoints: [
      { label: "Năm ra mắt", value: "Tháng 01/2016" },
      { label: "Chiều dài phố đi bộ", value: "100 mét" },
      { label: "Số gian hàng sách", value: "Hơn 20 NXB lớn" },
      { label: "Vị trí", value: "Phường Sài Gòn, Thành phố Hồ Chí Minh" }
    ],
    pedagogicalTakeaways: [
      "Khuyến khích và phát triển thói quen đọc sách, nghiên cứu tài liệu văn hóa trong học sinh.",
      "Bài học về việc chuyển đổi công năng một tuyến phố giao thông thành không gian công cộng đậm tính nhân văn."
    ]
  },
  "CHỢ XÓM LƯỚI-VŨNG TÀU": {
    placeName: "CHỢ XÓM LƯỚI-VŨNG TÀU",
    category: "thuong_mai",
    categoryTitle: "Không gian Thương mại & Đời sống Cộng đồng",
    masterImage: infographicThuongMai,
    yearEstablished: "Thập niên 1980",
    architectOrOrigin: "Ngư dân Bãi Trước Vũng Tàu tự phát lập chợ cá tươi",
    keyClassification: "Chợ Hải sản Dân sinh truyền thống ven biển",
    dimensionsOrScale: "Nằm trên đường Phan Bội Châu giao Nguyễn Công Trứ, Bãi Trước",
    colorPalette: ["#0284c7", "#c29b38", "#0d9488", "#0f172a"],
    aiImagePrompt: "A lively seaside seafood market infographic of Xom Luoi Vung Tau. Visual icons of fresh crabs, lobsters, squid baskets brought straight from fishing boats, street food cooking stalls, map coordinates near Front Beach, oceanic blue and golden accents.",
    milestones: [
      { year: "Thập niên 1980", event: "Nơi các thuyền đánh cá nhỏ và ghe thúng cập bờ trao đổi hải sản sớm mai" },
      { year: "2000 – Nay", event: "Trở thành điểm đến ẩm thực hải sản tươi sống nổi tiếng của du khách và người dân" }
    ],
    visualHighlights: [
      "Cảnh tượng tấp nập lúc 15h–16h khi những mẻ ghẹ, mực nang, tôm tích tươi rói cập bến",
      "Dịch vụ chế biến hấp nướng hải sản tại chỗ theo phong vị dân dã miền biển",
      "Nét sinh hoạt chân chất của các cô bác tiểu thương là vợ con của những ngư dân bám biển"
    ],
    keyDataPoints: [
      { label: "Loại hình", value: "Chợ hải sản dân sinh" },
      { label: "Khung giờ vàng", value: "15:00 – 18:00 hàng ngày" },
      { label: "Sản vật nổi bật", value: "Ghẹ xanh, mực lá, tôm tích" },
      { label: "Địa chỉ", value: "Đường Phan Bội Châu, Phường Vũng Tàu" }
    ],
    pedagogicalTakeaways: [
      "Tìm hiểu đời sống kinh tế biển và tập quán đánh bắt ven bờ của ngư dân Nam Bộ.",
      "Học hỏi kỹ năng quan sát thực tế và giao tiếp xã hội khi tiếp xúc môi trường chợ truyền thống."
    ]
  },
  "LÀNG SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG": {
    placeName: "LÀNG SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG",
    category: "sang_tao",
    categoryTitle: "Không gian Nghệ thuật & Sáng tạo Truyền thống",
    masterImage: infographicSangTao,
    yearEstablished: "Thế kỷ 18 (Hơn 300 năm)",
    architectOrOrigin: "Các nghệ nhân vùng đất Thủ truyền đời từ cha ông",
    keyClassification: "Di sản Văn hóa Phi vật thể Quốc gia (2016)",
    dimensionsOrScale: "Quy trình chế tác thủ công cầu kỳ trải qua 25 công đoạn nghiêm ngặt",
    colorPalette: ["#c29b38", "#b91c1c", "#171717", "#fbbf24"],
    aiImagePrompt: "An artistic heritage infographic poster of Tuong Binh Hiep Lacquerware Village Binh Duong. Step-by-step diagram showing the 25 meticulous traditional lacquer steps: wood carcass seasoning, natural resin coating, gold and silver leaf inlay, mother-of-pearl engraving, water polishing layers, rich glossy black and gold leaf aesthetics.",
    milestones: [
      { year: "Thế kỷ 18", event: "Các lưu dân từ miền Trung và Bắc mang theo nghề sơn truyền thống lập nghiệp bên rạch Bà Lụa" },
      { year: "Thế kỷ 20", event: "Tranh và sản phẩm sơn mài Bình Dương xuất khẩu sang nhiều nước châu Âu" },
      { year: "2016", event: "Được công nhận Di sản Văn hóa Phi vật thể Quốc gia" }
    ],
    visualHighlights: [
      "Nghệ thuật cẩn vỏ trứng, dát vàng lá, bạc quỳ và xà cừ tạo chiều sâu quang học bí ẩn",
      "Sử dụng mủ cây sơn tự nhiên vùng Phú Thọ và nhựa cây Nam Bộ cho lớp bóng sâu thẳm",
      "Công đoạn mài tranh dưới nước kiên nhẫn làm hiện dần lớp màu ẩn sâu bên dưới"
    ],
    keyDataPoints: [
      { label: "Niên đại hình thành", value: "Hơn 300 năm" },
      { label: "Số công đoạn thủ công", value: "25 bước nghiêm ngặt" },
      { label: "Danh hiệu", value: "Di sản Quốc gia 2016" },
      { label: "Kỹ thuật đỉnh cao", value: "Cẩn trứng, dát vàng, mài nước" }
    ],
    pedagogicalTakeaways: [
      "Khâm phục sự kiên trì, tỉ mỉ và tâm huyết của những người thợ thủ công gìn giữ hồn cốt dân tộc.",
      "Khám phá sự khác biệt tinh tế giữa sơn mài truyền thống sử dụng nhựa tự nhiên và sơn công nghiệp."
    ]
  },
  "ĐỜN CA TÀI TỬ NAM BỘ": {
    placeName: "ĐỜN CA TÀI TỬ NAM BỘ",
    category: "sang_tao",
    categoryTitle: "Không gian Nghệ thuật & Sáng tạo Truyền thống",
    masterImage: infographicSangTao,
    yearEstablished: "Cuối thế kỷ 19",
    architectOrOrigin: "Cộng đồng nhạc sư, nhạc tài phương Nam",
    keyClassification: "Di sản Văn hóa Phi vật thể Đại diện của Nhân loại (UNESCO 2013)",
    dimensionsOrScale: "Dàn nhạc ngũ tuyệt: Đàn Kìm, Tranh, Cò, Bầu, Guitare phím lõm",
    colorPalette: ["#c29b38", "#d97706", "#451a03", "#fef3c7"],
    aiImagePrompt: "An elegant musical heritage educational infographic of UNESCO Don Ca Tai Tu Nam Bo. Illustrated diagrams of the quintet instruments: Dan Kim (moon lute), Dan Tranh (zither), Dan Co (two-string fiddle), Dan Bau (monochord), scalloped guitar. Visual explanation of the 20 master repertoires (Bac, Nam, Xuan, Ai), golden warm tone.",
    milestones: [
      { year: "Cuối thế kỷ 19", event: "Hình thành từ sự kết hợp của nhã nhạc cung đình Huế và dân ca sông nước Nam Bộ" },
      { year: "1919", event: "Nhạc sĩ Cao Văn Lầu sáng tác bản 'Dạ Cổ Hoài Lang' bất hủ tại Bạc Liêu" },
      { year: "2013", event: "UNESCO vinh danh là Di sản Văn hóa Phi vật thể Đại diện của Nhân loại" }
    ],
    visualHighlights: [
      "Bộ ngũ tuyệt nhạc cụ truyền thống: Đàn Kìm (kìm kẹp), Tranh, Cò, Bầu và Đàn Tam",
      "Cây đàn Guitare phím lõm độc đáo do người Việt Nam sáng tạo phù hợp luyến láy vọng cổ",
      "Không gian biểu diễn gần gũi trong vườn cây ăn trái, trên sông trăng hay chiếu đình Nam Bộ"
    ],
    keyDataPoints: [
      { label: "UNESCO vinh danh", value: "Năm 2013" },
      { label: "Nhạc cụ thủ lĩnh", value: "Đàn Kìm (Nguyệt)" },
      { label: "Hệ thống bản tổ", value: "20 bài bản tổ" },
      { label: "Tính chất nghệ thuật", value: "Diễn tấu thính phòng, ngẫu hứng" }
    ],
    pedagogicalTakeaways: [
      "Nắm được giá trị của việc bảo tồn nghệ thuật âm nhạc dân tộc được thế giới công nhận.",
      "Hiểu tính cách phóng khoáng, tình nghĩa, trọng đạo lý của người dân phương Nam qua giai điệu."
    ]
  },
  "NGHỆ THUẬT CẢI LƯƠNG NAM BỘ": {
    placeName: "NGHỆ THUẬT CẢI LƯƠNG NAM BỘ",
    category: "sang_tao",
    categoryTitle: "Không gian Nghệ thuật & Sáng tạo Truyền thống",
    masterImage: infographicSangTao,
    yearEstablished: "1918",
    architectOrOrigin: "Cải cách từ đờn ca tài tử và ca ra bộ của các tiền bối Nam Bộ",
    keyClassification: "Nghệ thuật Sân khấu Kịch hát Truyền thống Tiêu biểu",
    dimensionsOrScale: "Khẩu hiệu 'Cải cách tao vần theo tiến hóa - Lương truyền tuồng tích sánh văn minh'",
    colorPalette: ["#c29b38", "#dc2626", "#7c2d12", "#fafaf9"],
    aiImagePrompt: "A dramatic, theatrical heritage infographic poster of Cai Luong Opera Nam Bo. Showing theatrical stage curtains, ornate costume headdresses, face makeup diagrams, timeline from 1918 'Ca ra bo' to Golden Age theatre, iconic performance postures, vintage cinema and golden theatre aesthetic.",
    milestones: [
      { year: "1918", event: "Vở tuồng 'Lục Vân Tiên' được diễn tại rạp Thầy Năm Tú (Mỹ Tho), mở đầu sân khấu Cải lương" },
      { year: "Thập niên 1930 – 1970", event: "Thời kỳ hoàng kim với các đại bang Thanh Minh - Thanh Nga, Hương Mùa Thu, Dạ Lý Hương" },
      { year: "Hiện nay", event: "Được số hóa và đổi mới phương thức tiếp cận khán giả trẻ qua các dự án học đường" }
    ],
    visualHighlights: [
      "Sự kết hợp giữa nghệ thuật ca ngâm vọng cổ và kỹ xảo diễn xuất sân khấu kịch nghệ phương Tây",
      "Phục trang tuồng cổ lộng lẫy kết hợp các trường phái tuồng tích lịch sử chống ngoại xâm",
      "Dàn nhạc sân khấu hòa quyện giữa nhạc cụ dân tộc và ban nhạc phương Tây hiện đại"
    ],
    keyDataPoints: [
      { label: "Năm khởi xướng", value: "Năm 1918" },
      { label: "Ý nghĩa tên gọi", value: "Cải cách và Lương truyền" },
      { label: "Làn điệu cốt lõi", value: "Câu vọng cổ, lý, điệu hát" },
      { label: "Địa bàn phát triển", value: "Sài Gòn - TP.HCM & ĐBSCL" }
    ],
    pedagogicalTakeaways: [
      "Hiểu tinh thần dám đổi mới, thích nghi và tiếp thu tinh hoa thế giới của văn hóa phương Nam.",
      "Cảm nhận vẻ đẹp ngôn ngữ thi ca Việt Nam qua những lời ca cải lương chan chứa nghĩa tình."
    ]
  },
  "LỄ HỘI NGHINH ÔNG THẮNG TAM-VŨNG TÀU": {
    placeName: "LỄ HỘI NGHINH ÔNG THẮNG TAM-VŨNG TÀU",
    category: "sang_tao",
    categoryTitle: "Không gian Nghệ thuật & Sáng tạo Truyền thống",
    masterImage: infographicSangTao,
    yearEstablished: "Thời vua Minh Mạng (Đầu thế kỷ 19)",
    architectOrOrigin: "Cộng đồng ngư dân 3 làng Thắng Nhất, Thắng Nhì, Thắng Tam",
    keyClassification: "Di sản Văn hóa Phi vật thể Quốc gia (2018)",
    dimensionsOrScale: "Diễn ra vào ngày 16, 17, 18 tháng 8 âm lịch hàng năm tại Đình Thắng Tam",
    colorPalette: ["#0284c7", "#c29b38", "#ea580c", "#0f172a"],
    aiImagePrompt: "A vibrant marine cultural festival infographic poster of Nghinh Ong Festival Thang Tam Vung Tau. Sea procession diagram with decorated dragon boats honoring the Whale God (Ca Voi), lion dance on beach, giant whale bone relic hall (Lang Ong Nam Hai), festive flags, ocean waves and gold banner design.",
    milestones: [
      { year: "Đầu thế kỷ 19", event: "Ngư dân rước ngọc cốt Ông Nam Hải trôi dạt vào bờ về phụng thờ tại Đình Thắng Tam" },
      { year: "1840", event: "Vua Thiệu Trị ban sắc phong cho đền thờ Nam Hải Tướng Quân" },
      { year: "2018", event: "Bộ Văn hóa, Thể thao và Du lịch ghi danh vào Di sản Văn hóa Phi vật thể Quốc gia" }
    ],
    visualHighlights: [
      "Đoàn thuyền rồng cờ hoa rực rỡ xuất phát từ biển Bãi Trước ra khơi rước linh vị Ông",
      "Lăng Ông Nam Hải lưu giữ bộ xương cá Voi khổng lồ dài hơn 18m được bảo tồn nguyên vẹn",
      "Nghi thức chèo bả trạo, múa lân sư rồng và các trò chơi dân gian miền biển náo nhiệt"
    ],
    keyDataPoints: [
      { label: "Thời gian diễn ra", value: "16 - 18/8 Âm lịch" },
      { label: "Địa điểm chính", value: "Khu di tích Đình Thắng Tam" },
      { label: "Bộ xương cá Ông", value: "Dài 18m lưu giữ cẩn trọng" },
      { label: "Xếp hạng", value: "Di sản Phi vật thể Quốc gia 2018" }
    ],
    pedagogicalTakeaways: [
      "Hiểu về tín ngưỡng thờ cúng thủy thần và đạo lý uống nước nhớ nguồn của cư dân miền biển.",
      "Tôn trọng và có ý thức bảo vệ môi trường sinh thái đại dương, bảo tồn loài cá heo, cá voi."
    ]
  },
  "THÀNH PHỐ MỚI BÌNH DƯƠNG": {
    placeName: "THÀNH PHỐ MỚI BÌNH DƯƠNG",
    category: "bien_do_thi",
    categoryTitle: "Không gian Sông nước, Biển đảo & Đô thị Thông minh",
    masterImage: PLACE_IMAGES["./assets/s6_thanhphomoi_02.jpg"] || infographicBienDoThi,
    yearEstablished: "2010",
    architectOrOrigin: "Quy hoạch bởi Viện Nghiên cứu Thiết kế Đại học Quốc gia Singapore (NUS)",
    keyClassification: "Đô thị Thông minh Tiên phong Vùng Kinh tế Trọng điểm Phía Nam",
    dimensionsOrScale: "Quy mô 1.000 hecta, trung tâm hành chính 20 tầng, công viên trung tâm 75 ha",
    colorPalette: ["#0284c7", "#c29b38", "#10b981", "#0b0f17"],
    aiImagePrompt: "A futuristic modern urban planning educational infographic poster of Binh Duong New City. Architectural diagram of the 20-story twin tower Integrated Political-Administrative Center, central green park with ecological lake, smart transit bus routes, solar grid data, high-tech clean cyan and gold layout.",
    milestones: [
      { year: "2010", event: "Khởi công xây dựng Thành phố Mới theo đề án phát triển đô thị hiện đại bền vững" },
      { year: "2014", event: "Khánh thành Tòa nhà Trung tâm Hành chính tập trung tỉnh Bình Dương" },
      { year: "2023", event: "Diễn đàn Cộng đồng Thông minh Thế giới (ICF) vinh danh Top 1 Cộng đồng Thông minh" }
    ],
    visualHighlights: [
      "Tòa tháp đôi Trung tâm Hành chính cao 20 tầng có bãi đỗ trực thăng thiết kế hiện đại",
      "Công viên sinh thái trung tâm rộng 75 hecta với hồ nước điều hòa và nhạc nước nghệ thuật",
      "Hệ thống xe buýt nhanh Kaze Shuttle chạy bằng khí nén CNG thân thiện với môi trường"
    ],
    keyDataPoints: [
      { label: "Quy mô quy hoạch", value: "1.000 ha" },
      { label: "Công viên trung tâm", value: "75 ha mảng xanh" },
      { label: "Công trình điểm nhấn", value: "Tòa tháp đôi 20 tầng" },
      { label: "Vinh danh quốc tế", value: "Top 1 Smart 21 (ICF)" }
    ],
    pedagogicalTakeaways: [
      "Nhận diện mô hình phát triển đô thị xanh, thông minh, tích hợp quản trị số hóa thế kỷ 21.",
      "Khơi dậy tinh thần nghiên cứu khoa học và định hướng nghề nghiệp công nghệ cao cho học sinh."
    ]
  },
  "HỒ DẦU TIẾNG-BÌNH DƯƠNG": {
    placeName: "HỒ DẦU TIẾNG-BÌNH DƯƠNG",
    category: "bien_do_thi",
    categoryTitle: "Không gian Sông nước, Biển đảo & Đô thị Thông minh",
    masterImage: PLACE_IMAGES["./assets/s6_hodautieng_02.jpg"] || infographicBienDoThi,
    yearEstablished: "1981 – 1985",
    architectOrOrigin: "Công trình thủy nông trọng điểm quốc gia sau ngày thống nhất",
    keyClassification: "Hồ nước nhân tạo lớn nhất Đông Nam Á",
    dimensionsOrScale: "Diện tích mặt nước 270 km², dung tích chứa hơn 1.58 tỷ m³ nước",
    colorPalette: ["#0284c7", "#059669", "#c29b38", "#0f172a"],
    aiImagePrompt: "A geographic hydro-engineering infographic poster of Dau Tieng Lake Binh Duong. Satellite map diagram showing the 270 km2 reservoir, dam spillway cross-section, water irrigation canal networks feeding Tay Ninh and HCMC, Mount Ba Den backdrop, lush nature blue and gold cartographic style.",
    milestones: [
      { year: "1981", event: "Hàng vạn thanh niên xung phong và nhân dân khởi công đào đắp công trình thế kỷ" },
      { year: "1985", event: "Chính thức khánh thành và xả nước phục vụ tưới tiêu cho hàng trăm nghìn hecta nông nghiệp" },
      { year: "Hiện nay", event: "Cung cấp nguồn nước sinh hoạt thiết yếu cho TP.HCM, Bình Dương và Tây Ninh" }
    ],
    visualHighlights: [
      "Mặt hồ mênh mông 270km² với các hòn đảo sinh thái xanh biếc như đảo Nhím, đảo Trảng",
      "Hệ thống đập chính dài hơn 1.1km ngăn dòng sông Sài Gòn trên vùng thượng nguồn",
      "Khung cảnh thiên nhiên kỳ vĩ tựa lưng vào bóng Núi Bà Đen linh thiêng xa xa"
    ],
    keyDataPoints: [
      { label: "Diện tích mặt nước", value: "270 km²" },
      { label: "Dung tích trữ nước", value: "1.58 tỷ m³" },
      { label: "Quy mô", value: "Hồ nhân tạo lớn nhất Đông Nam Á" },
      { label: "Vai trò", value: "Cấp nước sinh hoạt & thủy lợi" }
    ],
    pedagogicalTakeaways: [
      "Hiểu về an ninh nguồn nước và kỹ thuật quản lý lưu vực sông Sài Gòn phục vụ đại đô thị.",
      "Ghi nhận công lao to lớn của thế hệ đi trước đã đổ mồ hôi xây dựng công trình thủy lợi đồ sộ."
    ]
  },
  "BÃI SAU VŨNG TÀU": {
    placeName: "BÃI SAU VŨNG TÀU",
    category: "bien_do_thi",
    categoryTitle: "Không gian Sông nước, Biển đảo & Đô thị Thông minh",
    masterImage: PLACE_IMAGES["./assets/s6_baisauvt_02.jpg"] || infographicBienDoThi,
    yearEstablished: "Khai thác du lịch từ thế kỷ 19",
    architectOrOrigin: "Tạo tác bờ biển tự nhiên của Mũi Nghinh Phong và Biển Đông",
    keyClassification: "Bãi tắm Du lịch Ven biển Tiêu biểu Miền Nam (Bãi Thùy Vân)",
    dimensionsOrScale: "Chiều dài bờ biển hơn 8km từ chân Núi Nhỏ đến Cửa Lấp",
    colorPalette: ["#0284c7", "#f59e0b", "#c29b38", "#0f172a"],
    aiImagePrompt: "A scenic coastal geography infographic poster of Back Beach Vung Tau (Bai Sau Thuy Van). Coastal map elevation showing the 8km shoreline, gentle surf dynamics, Cape Nghinh Phong headland, Hon Ba island with tidal footbridge path, sunshine gold and ocean turquoise tones.",
    milestones: [
      { year: "Thời Pháp thuộc", event: "Được người Pháp quy hoạch làm bãi nghỉ dưỡng Cap Saint-Jacques" },
      { year: "Thế kỷ 20 – Nay", event: "Trở thành bãi biển đông đảo và sôi động nhất thành phố biển Vũng Tàu" },
      { year: "2024 – Nay", event: "Quy hoạch đại công viên bãi biển Thùy Vân hiện đại chuẩn quốc tế" }
    ],
    visualHighlights: [
      "Bờ cát mịn thoai thoải trải dài hơn 8km đón trọn gió biển Đông Nam quanh năm",
      "Đảo Hòn Bà nằm chơ vơ ngoài biển khơi với con đường đá ẩn hiện kỳ thú khi thủy triều rút",
      "Quảng trường Cột Cờ Bãi Sau - trung tâm diễn ra các sự kiện thể thao và lễ hội biển"
    ],
    keyDataPoints: [
      { label: "Chiều dài bờ biển", value: "Hơn 8 km" },
      { label: "Tên gọi truyền thống", value: "Bãi Thùy Vân" },
      { label: "Đặc điểm địa hình", value: "Sóng êm, cát thoai thoải" },
      { label: "Điểm nhấn tự nhiên", value: "Đảo Hòn Bà & Mũi Nghinh Phong" }
    ],
    pedagogicalTakeaways: [
      "Nghiên cứu hiện tượng thủy triều và địa mạo bờ biển bồi tụ tại khu vực Nam Bộ.",
      "Ý thức bảo vệ môi trường du lịch biển, không xả rác và tôn trọng hệ sinh thái duyên hải."
    ]
  },
  "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU": {
    placeName: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU",
    category: "bien_do_thi",
    categoryTitle: "Không gian Sông nước, Biển đảo & Đô thị Thông minh",
    masterImage: PLACE_IMAGES["./assets/s6_langchaiphuochai_02.jpg"] || infographicBienDoThi,
    yearEstablished: "Cuối thế kỷ 18",
    architectOrOrigin: "Cộng đồng ngư dân định cư lâu đời dưới chân núi Minh Đạm",
    keyClassification: "Làng nghề Khai thác Hải sản & Nước mắm truyền thống Nam Bộ",
    dimensionsOrScale: "Bờ kè bích họa dài hơn 1km, đội thuyền thúng hơn 300 chiếc",
    colorPalette: ["#0284c7", "#c29b38", "#ea580c", "#0f172a"],
    aiImagePrompt: "An authentic coastal fishing village infographic poster of Phuoc Hai Dat Do. Cutaway of traditional bamboo coracle round boats (thuyen thung), fish sauce fermentation terracotta jars, fishermen pulling nets at dawn under Minh Dam mountain, ocean spray and golden dawn colors.",
    milestones: [
      { year: "Cuối thế kỷ 18", event: "Ngư dân miền Trung xuôi thuyền vào nam lập nên làng đánh cá lâu đời nhất vùng Đất Đỏ" },
      { year: "Kháng chiến", event: "Cung cấp lương thực, che chở cho cán bộ chiến sĩ tại căn cứ Núi Minh Đạm" },
      { year: "Hiện nay", event: "Phát triển du lịch cộng đồng kết hợp nghề làm khô, nước mắm truyền thống" }
    ],
    visualHighlights: [
      "Hàng trăm chiếc thuyền thúng tròn nan tre xếp ngay ngắn rực rỡ trên bãi cát",
      "Chợ cá họp chớp nhoáng lúc bình minh ngay mép sóng đón hải sản tươi sống từ thúng",
      "Bờ kè chắn sóng được phủ kín bởi những bức tranh bích họa rực rỡ sắc màu về biển khơi"
    ],
    keyDataPoints: [
      { label: "Niên đại hình thành", value: "Hơn 200 năm" },
      { label: "Địa bàn", value: "Thị trấn Phước Hải, Huyện Long Đất" },
      { label: "Phương tiện đánh bắt", value: "Thuyền thúng truyền thống" },
      { label: "Đặc sản nức tiếng", value: "Nước mắm cá cơm & cá khô" }
    ],
    pedagogicalTakeaways: [
      "Hiểu về kinh tế sinh kế biển truyền thống và kỹ thuật đan nan tre làm thuyền thúng độc đáo của người Việt.",
      "Gìn giữ và tôn vinh giá trị lao động của những người bám biển giữ vững ngư trường quê hương."
    ]
  },
  "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM": {
    placeName: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM",
    category: "bien_do_thi",
    categoryTitle: "Không gian Sông nước, Biển đảo & Đô thị Thông minh",
    masterImage: PLACE_IMAGES["./assets/s6_phodibonguyenhue_02.jpg"] || infographicBienDoThi,
    yearEstablished: "2015 (Nguyên gốc là Kênh Charner thế kỷ 19)",
    architectOrOrigin: "UBND TP.HCM quy hoạch cải tạo thành quảng trường đi bộ hiện đại",
    keyClassification: "Quảng trường Đô thị & Không gian Sinh hoạt Công cộng Trung tâm",
    dimensionsOrScale: "Chiều dài 670m, rộng 64m lát đá granite nguyên khối, kết nối sông Sài Gòn",
    colorPalette: ["#c29b38", "#38bdf8", "#64748b", "#090d16"],
    aiImagePrompt: "A sleek modern urban plaza infographic poster of Nguyen Hue Walking Street Saigon. Showing the 670m granite pedestrian promenade from City Hall to Bach Dang wharf riverbank, subterranean computer-controlled fountain light show, heritage colonial buildings alongside modern skyscrapers, golden nightlights aesthetics.",
    milestones: [
      { year: "1887", event: "Người Pháp lấp kênh Grand Canal (Kênh Lớn) để hình thành đại lộ Charner tráng lệ" },
      { year: "1955", event: "Chính thức đổi tên thành Đại lộ Nguyễn Huệ - trung tâm thương mại hoa tết Sài Gòn" },
      { year: "2015", event: "Khánh thành quảng trường đi bộ lát đá granite hiện đại đầu tiên của cả nước" }
    ],
    visualHighlights: [
      "Trục cảnh quan nối liền Tòa nhà Trụ sở HĐND - UBND TP với Bến Bạch Đằng và sông Sài Gòn",
      "Hệ thống đài phun nước nghệ thuật ngầm và trung tâm điều khiển âm thanh ánh sáng tự động",
      "Không gian diễn ra Đường hoa Tết truyền thống và các đại nhạc hội văn hóa nghệ thuật của thành phố"
    ],
    keyDataPoints: [
      { label: "Năm khánh thành", value: "Tháng 04/2015" },
      { label: "Chiều dài quảng trường", value: "670 mét" },
      { label: "Chiều rộng mặt bằng", value: "64 mét" },
      { label: "Kết cấu mặt đường", value: "Đá granite bền vững" }
    ],
    pedagogicalTakeaways: [
      "Tìm hiểu tiến trình lịch sử quy hoạch đô thị từ thời kênh rạch đến đô thị đi bộ văn minh.",
      "Quan sát cách không gian công cộng gắn kết cộng đồng cư dân và giới trẻ với nhịp sống thành phố."
    ]
  }
};

// Comprehensive mapping linking each place to its highest-resolution authentic asset or infographic cutaway
export const PLACE_MASTER_IMAGES: Record<string, string> = {
  "Bến Nhà Rồng": PLACE_IMAGES["./assets/ben_nha_rong.webp"] || infographicLichSu,
  "BẾN NHÀ RỒNG": PLACE_IMAGES["./assets/ben_nha_rong.webp"] || infographicLichSu,
  "DINH ĐỘC LẬP": infographicDinhDocLap,
  "ĐỊA ĐẠO CỦ CHI": infographicCuChi,
  "ĐỊA ĐẠO CỦ CHI-TPHCM": infographicCuChi,
  "NHÀ TÙ CÔN ĐẢO": PLACE_IMAGES["./assets/nha_tu_con_dao.webp"] || infographicLichSu,
  "NHÀ TÙ CÔN ĐẢO-BRVT": PLACE_IMAGES["./assets/nha_tu_con_dao.webp"] || infographicLichSu,
  "BƯU ĐIỆN TRUNG TÂM TPHCM": infographicBuuDien,
  "BƯU ĐIỆN TRUNG TÂM SÀI GÒN": infographicBuuDien,
  "Bưu điện Trung tâm Thành phố Hồ Chí Minh": infographicBuuDien,
  "CHÙA HỘI KHÁNH": PLACE_IMAGES["./assets/chua_hoi_khanh.webp"] || infographicKienTruc,
  "CHÙA HỘI KHÁNH-BÌNH DƯƠNG": PLACE_IMAGES["./assets/chua_hoi_khanh.webp"] || infographicKienTruc,
  "THÍCH CA PHẬT ĐÀI": PLACE_IMAGES["./assets/thich_ca_phat_dai.webp"] || infographicKienTruc,
  "THÍCH CA PHẬT ĐÀI-VŨNG TÀU": PLACE_IMAGES["./assets/thich_ca_phat_dai.webp"] || infographicKienTruc,
  "NHÀ THỜ ĐỨC BÀ": infographicNhaThoDucBa,
  "NHÀ THỜ ĐỨC BÀ-TPHCM": infographicNhaThoDucBa,
  "NHÀ THỜ ĐỨC BÀ SÀI GÒN": infographicNhaThoDucBa,
  "CHỢ THỦ DẦU MỘT": PLACE_IMAGES["./assets/cho_thu_dau_mot.webp"] || infographicThuongMai,
  "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG": PLACE_IMAGES["./assets/cho_thu_dau_mot.webp"] || infographicThuongMai,
  "CHỢ BẾN THÀNH": PLACE_IMAGES["./assets/cho_ben_thanh.webp"] || infographicThuongMai,
  "CHỢ BẾN THÀNH-TPHCM": PLACE_IMAGES["./assets/cho_ben_thanh.webp"] || infographicThuongMai,
  "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH": PLACE_IMAGES["./assets/duong_sach_nguyen_van_binh.webp"] || infographicThuongMai,
  "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH-TPHCM": PLACE_IMAGES["./assets/duong_sach_nguyen_van_binh.webp"] || infographicThuongMai,
  "CHỢ XÓM LƯỚI": PLACE_IMAGES["./assets/cho_xom_luoi.webp"] || infographicThuongMai,
  "CHỢ XÓM LƯỚI-VŨNG TÀU": PLACE_IMAGES["./assets/cho_xom_luoi.webp"] || infographicThuongMai,
  "LÀNG NGHỀ SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG": PLACE_IMAGES["./assets/son_mai_tuong_binh_hiep.webp"] || infographicSangTao,
  "ĐỜN CA TÀI TỬ-TPHCM": infographicDonCaTaiTu,
  "NGHỆ THUẬT SÂN KHẤU CẢI LƯƠNG NAM BỘ": PLACE_IMAGES["./assets/cai_luong_nam_bo.webp"] || infographicSangTao,
  "LỄ HỘI NGHINH ÔNG THẮNG TAM VŨNG TÀU": PLACE_IMAGES["./assets/le_hoi_nghinh_ong.webp"] || infographicSangTao,
  "THÀNH PHỐ MỚI BÌNH DƯƠNG": PLACE_IMAGES["./assets/s6_thanhphomoi_02.jpg"] || PLACE_IMAGES["./assets/thanh_pho_moi_binh_duong.webp"] || infographicBienDoThi,
  "Thành phố Mới Bình Dương": PLACE_IMAGES["./assets/s6_thanhphomoi_02.jpg"] || PLACE_IMAGES["./assets/thanh_pho_moi_binh_duong.webp"] || infographicBienDoThi,
  "HỒ DẦU TIẾNG-BÌNH DƯƠNG": PLACE_IMAGES["./assets/s6_hodautieng_02.jpg"] || PLACE_IMAGES["./assets/ho_dau_tieng.jpg"] || infographicBienDoThi,
  "Hồ Dầu Tiếng - Bình Dương": PLACE_IMAGES["./assets/s6_hodautieng_02.jpg"] || PLACE_IMAGES["./assets/ho_dau_tieng.jpg"] || infographicBienDoThi,
  "Hồ Dầu Tiếng": PLACE_IMAGES["./assets/s6_hodautieng_02.jpg"] || PLACE_IMAGES["./assets/ho_dau_tieng.jpg"] || infographicBienDoThi,
  "BÃI SAU-VŨNG TÀU": PLACE_IMAGES["./assets/s6_baisauvt_02.jpg"] || PLACE_IMAGES["./assets/bai_sau_vung_tau.jpg"] || infographicBienDoThi,
  "BÃI SAU VŨNG TÀU": PLACE_IMAGES["./assets/s6_baisauvt_02.jpg"] || PLACE_IMAGES["./assets/bai_sau_vung_tau.jpg"] || infographicBienDoThi,
  "Bãi Sau (Bãi Thùy Vân) - Vũng Tàu": PLACE_IMAGES["./assets/s6_baisauvt_02.jpg"] || PLACE_IMAGES["./assets/bai_sau_vung_tau.jpg"] || infographicBienDoThi,
  "Bãi Sau": PLACE_IMAGES["./assets/s6_baisauvt_02.jpg"] || PLACE_IMAGES["./assets/bai_sau_vung_tau.jpg"] || infographicBienDoThi,
  "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU": PLACE_IMAGES["./assets/s6_langchaiphuochai_02.jpg"] || PLACE_IMAGES["./assets/lang_chai_phuoc_hai.jpg"] || infographicBienDoThi,
  "Làng Chài Phước Hải - Bà Rịa – Vũng Tàu": PLACE_IMAGES["./assets/s6_langchaiphuochai_02.jpg"] || PLACE_IMAGES["./assets/lang_chai_phuoc_hai.jpg"] || infographicBienDoThi,
  "Làng Chài Phước Hải": PLACE_IMAGES["./assets/s6_langchaiphuochai_02.jpg"] || PLACE_IMAGES["./assets/lang_chai_phuoc_hai.jpg"] || infographicBienDoThi,
  "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM": PLACE_IMAGES["./assets/s6_phodibonguyenhue_02.jpg"] || PLACE_IMAGES["./assets/pho_di_bo_nguyen_hue.jpg"] || infographicBienDoThi,
  "PHỐ ĐI BỘ NGUYỄN HUỆ": PLACE_IMAGES["./assets/s6_phodibonguyenhue_02.jpg"] || PLACE_IMAGES["./assets/pho_di_bo_nguyen_hue.jpg"] || infographicBienDoThi,
  "Phố đi bộ Nguyễn Huệ": PLACE_IMAGES["./assets/s6_phodibonguyenhue_02.jpg"] || PLACE_IMAGES["./assets/pho_di_bo_nguyen_hue.jpg"] || infographicBienDoThi,
};

// Curated interactive hotspots catalog for landmarks
export const LANDMARK_HOTSPOTS: Record<string, InfographicHotspot[]> = {
  "Bến Nhà Rồng": [
    { id: 1, x: 50, y: 18, title: "Đôi Rồng Đất Nung Men Xanh", category: "Kiến trúc", description: "Cặp rồng đất nung tráng men ngọc lưỡng long chầu nguyệt tạo nên tên gọi dân gian Bến Nhà Rồng.", tag: "Biểu tượng" },
    { id: 2, x: 50, y: 48, title: "Vòm Cửa Roman Nhiệt Đới", category: "Kiến trúc", description: "Hệ thống vòm cuốn bán nguyệt bằng gạch trần đón gió sông Sài Gòn, giao thoa Pháp - Nam Bộ.", tag: "Kết cấu" },
    { id: 3, x: 25, y: 80, title: "Cầu Tàu Lịch Sử 1911", category: "Lịch sử", description: "Nơi người thanh niên Nguyễn Tất Thành bước lên con tàu ra đi tìm đường cứu nước.", tag: "Mốc son" },
    { id: 4, x: 75, y: 62, title: "Không Gian Trưng Bày Bác Hồ", category: "Văn hóa", description: "Lưu giữ hơn 20.000 tư liệu hiện vật quý báu về cuộc đời và sự nghiệp Chủ tịch Hồ Chí Minh.", tag: "Bảo tàng" }
  ],
  "BẾN NHÀ RỒNG": [
    { id: 1, x: 50, y: 18, title: "Đôi Rồng Đất Nung Men Xanh", category: "Kiến trúc", description: "Cặp rồng đất nung tráng men ngọc lưỡng long chầu nguyệt tạo nên tên gọi dân gian Bến Nhà Rồng.", tag: "Biểu tượng" },
    { id: 2, x: 50, y: 48, title: "Vòm Cửa Roman Nhiệt Đới", category: "Kiến trúc", description: "Hệ thống vòm cuốn bán nguyệt bằng gạch trần đón gió sông Sài Gòn, giao thoa Pháp - Nam Bộ.", tag: "Kết cấu" },
    { id: 3, x: 25, y: 80, title: "Cầu Tàu Lịch Sử 1911", category: "Lịch sử", description: "Nơi người thanh niên Nguyễn Tất Thành bước lên con tàu ra đi tìm đường cứu nước.", tag: "Mốc son" },
    { id: 4, x: 75, y: 62, title: "Không Gian Trưng Bày Bác Hồ", category: "Văn hóa", description: "Lưu giữ hơn 20.000 tư liệu hiện vật quý báu về cuộc đời và sự nghiệp Chủ tịch Hồ Chí Minh.", tag: "Bảo tàng" }
  ],
  "DINH ĐỘC LẬP": [
    { id: 1, x: 50, y: 38, title: "Rèm Hoa Đá Gióng Trúc", category: "Kiến trúc", description: "Bức rèm hoa đá cách điệu các gióng trúc thanh nhã, lấy sáng tự nhiên và thông gió mát.", tag: "Đặc trưng" },
    { id: 2, x: 50, y: 15, title: "Sân Thượng Trực Thăng", category: "Lịch sử", description: "Điểm đỗ trực thăng trên nóc Dinh, nơi lưu dấu lịch sử ngày đại thắng mùa xuân 1975.", tag: "Di tích" },
    { id: 3, x: 50, y: 84, title: "Cổng Chính Chiến Dịch HCM", category: "Lịch sử", description: "Cổng sắt nơi xe tăng 390 và 843 húc đổ trưa 30/4/1975 giải phóng hoàn toàn miền Nam.", tag: "Quốc gia đặc biệt" },
    { id: 4, x: 22, y: 70, title: "Hệ Thống Hầm Ngầm Kiên Cố", category: "Kỹ thuật", description: "Trung tâm chỉ huy dưới lòng đất đúc bê tông dày chịu được bom phá hạng nặng.", tag: "Công trình ngầm" }
  ],
  "ĐỊA ĐẠO CỦ CHI-TPHCM": [
    { id: 1, x: 30, y: 72, title: "Nắp Hầm Ngụy Trang Rừng", category: "Kỹ thuật", description: "Cửa hầm gỗ nhỏ hẹp chỉ vừa người lọt thỏm, ngụy trang tuyệt hảo bằng lá mục cao su.", tag: "Bí mật" },
    { id: 2, x: 65, y: 46, title: "Bếp Hoàng Cầm Không Khói", category: "Kỹ thuật", description: "Sáng kiến đào rãnh tán khói dài dưới lòng đất để nấu ăn mà phi cơ địch không phát hiện.", tag: "Sáng tạo" },
    { id: 3, x: 80, y: 28, title: "Lỗ Thông Hơi Ụ Gò Mối", category: "Kỹ thuật", description: "Miệng thông gió ngụy trang khéo léo bên trong các ụ mối đùn và gốc cây rừng nhiệt đới.", tag: "Sinh tồn" },
    { id: 4, x: 50, y: 86, title: "Tầng Hầm Thứ 3 Sâu 12m", category: "Lịch sử", description: "Tầng địa đạo sâu nhất với bệnh viện dã chiến, hội trường và giếng nước uống an toàn.", tag: "Thành lũy" }
  ],
  "NHÀ TÙ CÔN ĐẢO": [
    { id: 1, x: 45, y: 35, title: "Hệ Thống Chuồng Cọp Bí Mật", category: "Lịch sử", description: "Khu biệt giam với sàn thao tác song sắt phía trên, tội ác bị giấu kín suốt 30 năm.", tag: "Tội ác chiến tranh" },
    { id: 2, x: 25, y: 65, title: "Xà Lim Đá Biệt Giam", category: "Lịch sử", description: "Những phòng giam đá lạnh buốt cùm chân người tù kiên trung trong bóng tối triền miên.", tag: "Ý chí kiên cường" },
    { id: 3, x: 75, y: 70, title: "Khu Biệt Lập Hầm Phân Bò", category: "Lịch sử", description: "Nơi đày ải cực kỳ dã man đối với những người tù chính trị không chịu khuất phục.", tag: "Di tích" },
    { id: 4, x: 50, y: 15, title: "Cây Bàng Cổ Thụ & Hàng Dương", category: "Văn hóa", description: "Chứng nhân lịch sử che chở cho hàng ngàn liệt sĩ và nữ anh hùng Võ Thị Sáu.", tag: "Tâm linh" }
  ],
  "BƯU ĐIỆN TRUNG TÂM TPHCM": [
    { id: 1, x: 50, y: 22, title: "Mặt Tiền Đồng Hồ Cổ Kính", category: "Kiến trúc", description: "Chiếc đồng hồ tròn lớn trên đỉnh cổng chính với hoa văn chạm khắc tinh xảo và các bảng tên nhà khoa học điện học thế giới.", tag: "Mặt đứng" },
    { id: 2, x: 50, y: 52, title: "Mái Vòm Khung Sắt Eiffel", category: "Kỹ thuật", description: "Hệ vòm sắt rèn uốn cong thanh thoát hơn 60m do kỹ sư bậc thầy Gustave Eiffel tính toán kết cấu.", tag: "Kiệt tác" },
    { id: 3, x: 28, y: 62, title: "Bản Đồ Cổ Nam Kỳ Vẽ Tay", category: "Văn hóa", description: "Hai bức họa lịch sử nguyên bản trên vòm tường mô tả mạng lưới điện báo Sài Gòn xưa (1892 & 1936).", tag: "Di sản tư liệu" },
    { id: 4, x: 74, y: 76, title: "Hàng Bốt Điện Thoại Gỗ Cổ", category: "Văn hóa", description: "Các cabin điện thoại bằng gỗ tếch màu trầm và hòm thư lưu dấu nhịp sống viễn thông hơn một thế kỷ.", tag: "Ký ức đô thị" }
  ],
  "BƯU ĐIỆN TRUNG TÂM SÀI GÒN": [
    { id: 1, x: 50, y: 22, title: "Mặt Tiền Đồng Hồ Cổ Kính", category: "Kiến trúc", description: "Chiếc đồng hồ tròn lớn trên đỉnh cổng chính với hoa văn chạm khắc tinh xảo phong cách Phục Hưng.", tag: "Mặt đứng" },
    { id: 2, x: 50, y: 52, title: "Mái Vòm Khung Sắt Eiffel", category: "Kỹ thuật", description: "Hệ vòm sắt uốn cong thanh thoát do kỹ sư bậc thầy Gustave Eiffel tính toán kết cấu.", tag: "Kiệt tác" },
    { id: 3, x: 28, y: 62, title: "Bản Đồ Cổ Nam Kỳ Vẽ Tay", category: "Văn hóa", description: "Hai bức họa lịch sử nguyên bản trên vòm tường mô tả mạng lưới điện báo Sài Gòn xưa.", tag: "Di sản tư liệu" },
    { id: 4, x: 74, y: 76, title: "Hàng Bốt Điện Thoại Gỗ Cổ", category: "Văn hóa", description: "Các cabin điện thoại bằng gỗ tếch màu trầm lưu dấu nhịp sống viễn thông hơn một thế kỷ.", tag: "Ký ức đô thị" }
  ],
  "CHÙA HỘI KHÁNH-BÌNH DƯƠNG": [
    { id: 1, x: 50, y: 22, title: "Đại Tượng Phật Nằm Dài 52m", category: "Văn hóa", description: "Tượng Phật nhập niết bàn trên mái chùa dài nhất châu Á, xác lập kỷ lục tâm linh ấn tượng.", tag: "Kỷ lục châu Á" },
    { id: 2, x: 50, y: 60, title: "Chánh Điện Gỗ Chạm Lọng", category: "Kiến trúc", description: "Kết cấu cột gỗ quý nguyên khối với kỹ nghệ chạm khắc lọng tinh xảo của đất Thủ.", tag: "Điêu khắc cổ" },
    { id: 3, x: 22, y: 45, title: "Khu Tháp Tổ Cổ Tự 1741", category: "Lịch sử", description: "Nơi yên nghỉ của các bậc cao tăng khai sơn phá thạch vùng đất Bình Dương từ thế kỷ 18.", tag: "Cổ tự" },
    { id: 4, x: 78, y: 70, title: "Bộ Bao Lam Tứ Linh - Tứ Quý", category: "Kiến trúc", description: "Kiệt tác trang trí gỗ của làng nghề mộc Thủ Dầu Một được bảo tồn nguyên vẹn.", tag: "Di sản gỗ" }
  ],
  "THÍCH CA PHẬT ĐÀI-VŨNG TÀU": [
    { id: 1, x: 50, y: 28, title: "Đại Tượng Đức Phật Tọa Thiền", category: "Kiến trúc", description: "Tượng Phật Thích Ca bằng xi măng trắng cao 10.2m uy nghiêm hướng ra biển cả bao la.", tag: "Điêu khắc Phật giáo" },
    { id: 2, x: 50, y: 65, title: "Tòa Sen Trắng Thanh Khiết", category: "Kiến trúc", description: "Bệ sen bát giác đường kính 4m tượng trưng cho sự giác ngộ vượt lên bùn nhơ.", tag: "Biểu tượng" },
    { id: 3, x: 76, y: 44, title: "Tháp Xá Lợi Bát Giác Cao 17m", category: "Văn hóa", description: "Ngọn tháp chứa ngọc xá lợi Đức Phật được thỉnh từ Sri Lanka về phụng thờ.", tag: "Tâm linh" },
    { id: 4, x: 24, y: 74, title: "Vườn Rừng Sườn Núi Lớn", category: "Cảnh quan", description: "Quần thể 28 ha ẩn mình giữa rừng cây nhiệt đới ngắm trọn vẹn vịnh Gành Rái.", tag: "Thắng cảnh" }
  ],
  "NHÀ THỜ ĐỨC BÀ-TPHCM": [
    { id: 1, x: 50, y: 16, title: "Tháp Chuông Đôi 60.5m", category: "Kiến trúc", description: "Hai tháp chuông vươn cao với 6 quả chuông đồng đúc tại Pháp nặng gần 30 tấn.", tag: "Biểu tượng Sài Gòn" },
    { id: 2, x: 35, y: 55, title: "Tường Gạch Marseille Không Trát", category: "Kỹ thuật", description: "Gạch đất nung nhập trực tiếp từ Marseille (Pháp) giữ màu đỏ tươi hơn 140 năm.", tag: "Kỹ thuật đặc biệt" },
    { id: 3, x: 50, y: 45, title: "Cửa Sổ Hoa Hồng Kính Màu", category: "Kiến trúc", description: "Các ô kính màu nghệ thuật lung linh tái hiện tích thánh và lấy ánh sáng huyền ảo.", tag: "Nghệ thuật Gothic" },
    { id: 4, x: 50, y: 88, title: "Tượng Đức Mẹ Hòa Bình", category: "Văn hóa", description: "Tượng đá cẩm thạch trắng Carrara (Ý) đặt tại quảng trường trung tâm Công xã Paris.", tag: "Quảng trường" }
  ],
  "CHỢ BẾN THÀNH-TPHCM": [
    { id: 1, x: 50, y: 26, title: "Tháp Đồng Hồ Cửa Nam", category: "Kiến trúc", description: "Tháp đồng hồ 3 mặt hình chóp đặc trưng trở thành biểu tượng đại diện của đô thị TP.HCM.", tag: "Biểu tượng đô thị" },
    { id: 2, x: 32, y: 52, title: "Phù Điêu Gốm Biên Hòa 1912", category: "Văn hóa", description: "Những bức phù điêu đất nung men màu mô tả sản vật trù phú của vùng đồng bằng Nam Bộ.", tag: "Gốm mỹ nghệ" },
    { id: 3, x: 72, y: 65, title: "4 Cửa Đông - Tây - Nam - Bắc", category: "Kiến trúc", description: "Hệ thống 4 cửa mở ra 4 đại lộ sầm uất với mái ngói hạ đón gió mát tự nhiên.", tag: "Giao thương" },
    { id: 4, x: 50, y: 85, title: "1.500 Sạp Hàng Trù Phú", category: "Thương mại", description: "Khu chợ sầm uất quy tụ tơ lụa, cà phê, thủ công mỹ nghệ và ẩm thực đêm danh tiếng.", tag: "Thương mại sầm uất" }
  ],
  "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG": [
    { id: 1, x: 50, y: 25, title: "Tháp Đồng Hồ Kiến Trúc Pháp", category: "Kiến trúc", description: "Tháp đồng hồ cổ xây dựng từ thập niên 1930 soi bóng bên bờ sông Sài Gòn.", tag: "Dấu ấn thuộc địa" },
    { id: 2, x: 50, y: 56, title: "Nhà Lồng Chợ Art Deco", category: "Kiến trúc", description: "Hệ vòm bê tông thông thoáng chịu lực tốt cho không gian giao thương hàng trăm sạp.", tag: "Kết cấu" },
    { id: 3, x: 25, y: 78, title: "Bến Thuyền Gốm Sứ Sông Sài Gòn", category: "Lịch sử", description: "Cửa ngõ vận chuyển đồ gốm Lái Thiêu, sơn mài Tương Bình Hiệp tỏa đi khắp Nam Kỳ.", tag: "Giao thương đường thủy" },
    { id: 4, x: 75, y: 70, title: "Chợ Đêm Phố Đi Bộ Bạch Đằng", category: "Văn hóa", description: "Không gian ẩm thực, dạo mát và giao lưu văn hóa sôi động của người dân đất Thủ.", tag: "Đời sống cộng đồng" }
  ],
  "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH-TPHCM": [
    { id: 1, x: 50, y: 18, title: "Hàng Me Cổ Thụ Rợp Mát", category: "Cảnh quan", description: "Hàng cây me rợp bóng tạo vi khí hậu mát mẻ giữa trung tâm quận 1 náo nhiệt.", tag: "Không gian xanh" },
    { id: 2, x: 30, y: 55, title: "Kiosk Sách Bằng Gỗ Tự Nhiên", category: "Kiến trúc", description: "Hơn 20 gian hàng sách mở bằng gỗ mộc thân thiện môi trường quy tụ các NXB uy tín.", tag: "Văn hóa đọc" },
    { id: 3, x: 72, y: 62, title: "Sân Khấu Ra Mắt & Giao Lưu Tác Giả", category: "Văn hóa", description: "Điểm hẹn ra mắt sách mới, tọa đàm văn học nghệ thuật và triển lãm tranh thiếu nhi.", tag: "Tri thức" },
    { id: 4, x: 50, y: 88, title: "Trục Di Sản Liền Kề Bưu Điện", category: "Kiến trúc", description: "Tuyến đường đi bộ kết nối hài hòa giữa Nhà thờ Đức Bà và Bưu điện Trung tâm.", tag: "Quần thể di sản" }
  ],
  "CHỢ XÓM LƯỚI-VŨNG TÀU": [
    { id: 1, x: 35, y: 50, title: "Hải Sản Tươi Vừa Cập Bến", category: "Thương mại", description: "Ghe thuyền cập bến mang theo cua ghẹ xanh, tôm tích, mực nang tươi rói còn bơi sủi bọt.", tag: "Hải sản tươi" },
    { id: 2, x: 65, y: 55, title: "Chế Biến Nóng Tại Chỗ", category: "Văn hóa", description: "Các bếp than đỏ rực hấp luộc nướng hải sản ăn liền thơm phức hương vị biển Vũng Tàu.", tag: "Ẩm thực duyên hải" },
    { id: 3, x: 50, y: 80, title: "Phố Chợ Ngư Dân Truyền Thống", category: "Lịch sử", description: "Khu chợ hình thành từ bến đậu thuyền của những ngư dân vùng Bãi Trước lâu đời.", tag: "Đời sống ngư dân" }
  ],
  "LÀNG NGHỀ SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG": [
    { id: 1, x: 26, y: 50, title: "Khâu Làm Vóc & Phủ Sơn Ta", category: "Kỹ thuật", description: "Quy trình làm cốt gỗ kén chọn và quét nhiều lớp nhựa cây sơn tự nhiên bền chắc.", tag: "Cốt lõi bí truyền" },
    { id: 2, x: 50, y: 35, title: "Nghệ Thuật Cẩn Ốc & Vỏ Trứng", category: "Văn hóa", description: "Bàn tay tài hoa của nghệ nhân cẩn từng mảnh xà cừ óng ánh tạo nên họa tiết sống động.", tag: "Tinh hoa mỹ nghệ" },
    { id: 3, x: 75, y: 60, title: "Kỹ Thuật Mài Nước Độc Đáo", category: "Kỹ thuật", description: "Mài tranh dưới nước qua 25 công đoạn khắt khe để từng lớp màu sắc huyền diệu hiện dần.", tag: "Di sản phi vật thể" },
    { id: 4, x: 50, y: 85, title: "Thương Hiệu Sơn Mài Quốc Tế", category: "Lịch sử", description: "Sản phẩm sơn mài đất Thủ vượt đại dương hiện diện tại các bảo tàng và tư gia châu Âu.", tag: "Rạng danh đất nước" }
  ],
  "ĐỜN CA TÀI TỬ-TPHCM": [
    { id: 1, x: 25, y: 40, title: "Đàn Kìm (Nguyệt Cầm)", category: "Văn hóa", description: "Nhạc cụ lĩnh xướng, giữ bè chính và chỉ huy nhịp điệu của cả ban nhạc tài tử.", tag: "Trưởng ban nhạc" },
    { id: 2, x: 50, y: 35, title: "Đàn Tranh 16 Dây Thanh Thoát", category: "Văn hóa", description: "Rải những âm hoa mỹ như nước chảy mây trôi làm mềm mại bản dạ cổ hoài lang.", tag: "Thanh âm mượt mà" },
    { id: 3, x: 75, y: 40, title: "Đàn Cò (Nhị) Réo Rắt", category: "Văn hóa", description: "Tiếng đàn mô phỏng giọng ngâm ai oán, sâu lắng của người dân phương nam mở đất.", tag: "Hồn cốt Nam Bộ" },
    { id: 4, x: 50, y: 76, title: "Guitar Phím Lõm Độc Đáo", category: "Kỹ thuật", description: "Sự sáng tạo tuyệt vời của nghệ nhân Việt khi khoét sâu phím đàn Tây để nhấn nhá điệu Nam, Oán.", tag: "Sáng tạo Việt Nam" }
  ],
  "NGHỆ THUẬT SÂN KHẤU CẢI LƯƠNG NAM BỘ": [
    { id: 1, x: 50, y: 25, title: "Phục Trang Mũ Mão Tuồng Cổ", category: "Văn hóa", description: "Trang phục thêu kim tuyến lộng lẫy và mão tướng uy nghiêm của các nhân vật anh hùng.", tag: "Mỹ thuật sân khấu" },
    { id: 2, x: 50, y: 55, title: "Nghệ Thuật Ca Vọng Cổ", category: "Văn hóa", description: "Những câu vọng cổ ngân dài ngọt ngào truyền tải trọn vẹn nỗi niềm nhân vật.", tag: "Đỉnh cao thanh âm" },
    { id: 3, x: 25, y: 75, title: "Dàn Nhạc Sân Khấu Sống Động", category: "Kỹ thuật", description: "Sự hòa tấu nhuần nhuyễn giữa bộ gõ, đàn sến, đàn kìm tạo hiệu ứng kịch tính cao độ.", tag: "Hòa âm" },
    { id: 4, x: 75, y: 75, title: "Đề Tài Lịch Sử Vệ Quốc", category: "Lịch sử", description: "Sân khấu tái hiện hào khí Hai Bà Trưng, Trần Hưng Đạo hun đúc lòng yêu nước nồng nàn.", tag: "Giáo dục truyền thống" }
  ],
  "LỄ HỘI NGHINH ÔNG THẮNG TAM VŨNG TÀU": [
    { id: 1, x: 50, y: 30, title: "Đoàn Thuyền Hoa Rước Cá Ông", category: "Văn hóa", description: "Hàng trăm tàu thuyền cờ hoa rực rỡ hộ tống kiệu Nghinh Ông rẽ sóng ra khơi cầu an.", tag: "Nghi lễ biển" },
    { id: 2, x: 50, y: 60, title: "Đền Thờ Thần Nam Hải Lăng Ông", category: "Kiến trúc", description: "Ngôi đền cổ Thắng Tam nơi lưu giữ bộ cốt cá voi khổng lồ được ngư dân tôn kính như vị thần hộ mệnh.", tag: "Tín ngưỡng dân gian" },
    { id: 3, x: 25, y: 75, title: "Bộ Xương Cá Voi Khổng Lồ", category: "Lịch sử", description: "Chứng tích lịch sử hơn 100 năm được bảo quản trang trọng trong lăng theo tục thờ Ông.", tag: "Di vật linh thiêng" },
    { id: 4, x: 75, y: 75, title: "Hội Đua Thuyền Thúng & Hát Bội", category: "Văn hóa", description: "Các trò chơi dân gian hào hứng gắn liền với nghề đi biển của ngư dân Nam Bộ.", tag: "Hội hè dân gian" }
  ],
  "THÀNH PHỐ MỚI BÌNH DƯƠNG": [
    { id: 1, x: 50, y: 30, title: "Tháp Đôi Trung Tâm Hành Chính", category: "Kiến trúc", description: "Tòa tháp đôi 20 tầng biểu tượng cho chính quyền số hiện đại, thân thiện của Bình Dương.", tag: "Đô thị thông minh" },
    { id: 2, x: 50, y: 68, title: "Công Viên Trung Tâm 75 Hecta", category: "Cảnh quan", description: "Lá phổi xanh rộng lớn với hồ điều hòa sinh thái, đường dạo bộ và đài phun nước.", tag: "Môi trường xanh" },
    { id: 3, x: 25, y: 60, title: "Trung Tâm Thương Mại WTC Gateway", category: "Kỹ thuật", description: "Khu phức hợp nhà ga metro trung tâm và triển lãm kinh tế quốc tế hiện đại bậc nhất.", tag: "Hạ tầng tương lai" },
    { id: 4, x: 75, y: 78, title: "Hệ Thống Xe Buýt Điện Kaze", category: "Kỹ thuật", description: "Giao thông công cộng xanh sử dụng năng lượng sạch kết nối thông suốt toàn đô thị.", tag: "Giao thông xanh" }
  ],
  "HỒ DẦU TIẾNG-BÌNH DƯƠNG": [
    { id: 1, x: 50, y: 45, title: "Biển Hồ Thủy Lợi 270 km²", category: "Kỹ thuật", description: "Công trình hồ nhân tạo lớn nhất Đông Nam Á tích trữ 1,58 tỷ m³ nước ngọt.", tag: "Đại công trình" },
    { id: 2, x: 75, y: 22, title: "Bóng Dáng Núi Bà Đen Tây Ninh", category: "Cảnh quan", description: "Ngọn núi cao nhất Đông Nam Bộ sừng sững in bóng xuống mặt gương nước hồ phẳng lặng.", tag: "Cảnh sắc non nước" },
    { id: 3, x: 25, y: 65, title: "Đập Tràn Xả Lũ Điều Tiết", category: "Kỹ thuật", description: "Hệ thống cửa van xả lũ bảo vệ an toàn cho lưu vực sông Sài Gòn mùa mưa bão.", tag: "Thủy lợi quốc gia" },
    { id: 4, x: 50, y: 85, title: "Mạng Kênh Tưới Đổi Mới Nông Nghiệp", category: "Lịch sử", description: "Dòng nước ngọt tưới xanh hàng trăm nghìn hecta hoa màu của Bình Dương và Tây Ninh.", tag: "Ích quốc lợi dân" }
  ],
  "BÃI SAU-VŨNG TÀU": [
    { id: 1, x: 50, y: 48, title: "Bờ Cát Vàng Dài 8km", category: "Cảnh quan", description: "Bãi biển thoai thoải, sóng êm, cát sạch mịn lý tưởng cho tắm biển và thể thao nước.", tag: "Bờ biển vàng" },
    { id: 2, x: 25, y: 65, title: "Đại Lộ Du Lịch Thùy Vân", category: "Kiến trúc", description: "Tuyến đường ven biển rợp bóng phi lao và dừa xanh với công viên hoa rực rỡ.", tag: "Đô thị biển" },
    { id: 3, x: 78, y: 35, title: "Mũi Nghinh Phong Đón Gió Biển", category: "Cảnh quan", description: "Mỏm đá vươn dài ra đại dương ngắm bình minh và hoàng hôn tuyệt đẹp của thành phố biển.", tag: "Thắng cảnh" },
    { id: 4, x: 65, y: 82, title: "Con Đường Đá Nổi Miếu Hòn Bà", category: "Văn hóa", description: "Lối đi bộ đá độc nhất vô nhị chỉ hiện ra khi thủy triều rút dẫn ra ngôi miếu thiêng trên đảo.", tag: "Kỳ thú thiên nhiên" }
  ],
  "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU": [
    { id: 1, x: 35, y: 60, title: "Đội Thuyền Thúng Đan Nan Tre", category: "Văn hóa", description: "Hơn 300 chiếc thuyền thúng tròn nan tre trét chai dầu rái độc đáo của ngư dân làng chài.", tag: "Ngư cụ truyền thống" },
    { id: 2, x: 65, y: 65, title: "Chợ Cá Bình Minh Mép Sóng", category: "Thương mại", description: "Cảnh mua bán tấp nập lúc 5 giờ sáng khi thuyền thúng chở cá cơm, mực nang về bãi.", tag: "Hồn cốt làng chài" },
    { id: 3, x: 50, y: 35, title: "Bờ Kè Bích Họa Biển Khơi 1km", category: "Kiến trúc", description: "Những bức tranh bích họa sinh động trên đê chắn sóng kể câu chuyện giữ biển của người dân.", tag: "Nghệ thuật cộng đồng" },
    { id: 4, x: 80, y: 80, title: "Nghề Làm Nước Mắm Cá Cơm", category: "Lịch sử", description: "Gần 200 năm ủ chượp cá cơm tươi với muối hạt tạo nên hương vị nước mắm đậm đà xứ biển.", tag: "Nghề truyền thống" }
  ],
  "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM": [
    { id: 1, x: 50, y: 25, title: "Trụ Sở UBND TP & Tượng Đài Bác", category: "Lịch sử", description: "Công trình kiến trúc Pháp cổ điển hơn 115 năm tuổi cùng tượng đài Bác Hồ kính yêu.", tag: "Trái tim thành phố" },
    { id: 2, x: 50, y: 60, title: "Mặt Đường Lát Đá Granite 670m", category: "Kiến trúc", description: "Trục quảng trường đi bộ lát đá hoa cương nguyên khối hiện đại bậc nhất Việt Nam.", tag: "Không gian đi bộ" },
    { id: 3, x: 30, y: 75, title: "Hệ Thống Phun Nước Nghệ Thuật", category: "Kỹ thuật", description: "Đài phun nước ngầm kết hợp ánh sáng laser và âm nhạc biểu diễn các tối cuối tuần.", tag: "Công nghệ đô thị" },
    { id: 4, x: 70, y: 80, title: "Hướng Kết Nối Sông Sài Gòn", category: "Cảnh quan", description: "Trục mở tầm nhìn thoáng đãng nối liền trung tâm đô thị với công viên Bến Bạch Đằng.", tag: "Đô thị sông nước" }
  ]
};

// Default Blueprint schematic generator
export function getBlueprintData(placeName: string, meta: PlaceInfographicMeta): BlueprintData {
  return {
    orientation: meta.dimensionsOrScale.includes("sông Sài Gòn") ? "Hướng Đông Nam • Mặt tiền sông Sài Gòn" : "Tọa độ trung tâm Nam Bộ • Hướng gió Đông Nam",
    materials: [
      meta.architectOrOrigin.includes("Gỗ") ? "Gỗ sao, gỗ căm xe quý" : "Gạch nung Marseille & đá hoa cương",
      "Khung sắt chịu lực Gustave Eiffel / Bê tông đúc",
      "Gốm sứ men màu Biên Hòa & gạch gốm Lái Thiêu",
      "Kính màu nghệ thuật & ngói âm dương truyền thống"
    ],
    scale: meta.dimensionsOrScale || "Quy mô chuẩn di sản cấp Quốc gia",
    architecturalStyle: meta.architectOrOrigin || "Kiến trúc truyền thống giao thoa hiện đại",
    gridCoords: "10°46'N • 106°42'E",
    crossSectionNote: "Bản vẽ phân tích chịu tải, thông gió tự nhiên theo khí hậu nhiệt đới gió mùa Nam Bộ."
  };
}

// Master mapping dictionary resolving place names from contentData.json to infographic datasets
export const PLACE_KEY_MAPPINGS: Record<string, { info: string; img: string; hot: string; blue: string }> = {
  "Bến Nhà Rồng": { info: "Bến Nhà Rồng", img: "Bến Nhà Rồng", hot: "Bến Nhà Rồng", blue: "Bến Nhà Rồng" },
  "BẾN NHÀ RỒNG": { info: "Bến Nhà Rồng", img: "BẾN NHÀ RỒNG", hot: "BẾN NHÀ RỒNG", blue: "Bến Nhà Rồng" },
  "DINH ĐỘC LẬP": { info: "DINH ĐỘC LẬP", img: "DINH ĐỘC LẬP", hot: "DINH ĐỘC LẬP", blue: "DINH ĐỘC LẬP" },
  "Dinh Độc Lập": { info: "DINH ĐỘC LẬP", img: "DINH ĐỘC LẬP", hot: "DINH ĐỘC LẬP", blue: "DINH ĐỘC LẬP" },
  "ĐỊA ĐẠO CỦ CHI": { info: "ĐỊA ĐẠO CỦ CHI-TPHCM", img: "ĐỊA ĐẠO CỦ CHI", hot: "ĐỊA ĐẠO CỦ CHI-TPHCM", blue: "ĐỊA ĐẠO CỦ CHI-TPHCM" },
  "ĐỊA ĐẠO CỦ CHI-TPHCM": { info: "ĐỊA ĐẠO CỦ CHI-TPHCM", img: "ĐỊA ĐẠO CỦ CHI-TPHCM", hot: "ĐỊA ĐẠO CỦ CHI-TPHCM", blue: "ĐỊA ĐẠO CỦ CHI-TPHCM" },
  "Địa đạo Củ Chi": { info: "ĐỊA ĐẠO CỦ CHI-TPHCM", img: "ĐỊA ĐẠO CỦ CHI-TPHCM", hot: "ĐỊA ĐẠO CỦ CHI-TPHCM", blue: "ĐỊA ĐẠO CỦ CHI-TPHCM" },
  "NHÀ TÙ CÔN ĐẢO": { info: "NHÀ TÙ CÔN ĐẢO", img: "NHÀ TÙ CÔN ĐẢO", hot: "NHÀ TÙ CÔN ĐẢO", blue: "NHÀ TÙ CÔN ĐẢO" },
  "NHÀ TÙ CÔN ĐẢO-BRVT": { info: "NHÀ TÙ CÔN ĐẢO", img: "NHÀ TÙ CÔN ĐẢO", hot: "NHÀ TÙ CÔN ĐẢO", blue: "NHÀ TÙ CÔN ĐẢO" },
  "Nhà tù Côn Đảo": { info: "NHÀ TÙ CÔN ĐẢO", img: "NHÀ TÙ CÔN ĐẢO", hot: "NHÀ TÙ CÔN ĐẢO", blue: "NHÀ TÙ CÔN ĐẢO" },
  "BƯU ĐIỆN TRUNG TÂM TPHCM": { info: "BƯU ĐIỆN TRUNG TÂM TPHCM", img: "BƯU ĐIỆN TRUNG TÂM TPHCM", hot: "BƯU ĐIỆN TRUNG TÂM TPHCM", blue: "BƯU ĐIỆN TRUNG TÂM TPHCM" },
  "Bưu điện Trung tâm Thành phố Hồ Chí Minh": { info: "BƯU ĐIỆN TRUNG TÂM TPHCM", img: "BƯU ĐIỆN TRUNG TÂM TPHCM", hot: "BƯU ĐIỆN TRUNG TÂM TPHCM", blue: "BƯU ĐIỆN TRUNG TÂM TPHCM" },
  "Bưu điện Trung tâm Sài Gòn": { info: "BƯU ĐIỆN TRUNG TÂM TPHCM", img: "BƯU ĐIỆN TRUNG TÂM TPHCM", hot: "BƯU ĐIỆN TRUNG TÂM TPHCM", blue: "BƯU ĐIỆN TRUNG TÂM TPHCM" },
  "BƯU ĐIỆN TRUNG TÂM SÀI GÒN": { info: "BƯU ĐIỆN TRUNG TÂM TPHCM", img: "BƯU ĐIỆN TRUNG TÂM TPHCM", hot: "BƯU ĐIỆN TRUNG TÂM TPHCM", blue: "BƯU ĐIỆN TRUNG TÂM TPHCM" },
  "CHÙA HỘI KHÁNH": { info: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", img: "CHÙA HỘI KHÁNH", hot: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", blue: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG" },
  "Chùa Hội Khánh (Bình Dương)": { info: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", img: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", hot: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", blue: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG" },
  "Chùa Hội Khánh": { info: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", img: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", hot: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG", blue: "CHÙA HỘI KHÁNH-BÌNH DƯƠNG" },
  "THÍCH CA PHẬT ĐÀI": { info: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", img: "THÍCH CA PHẬT ĐÀI", hot: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", blue: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU" },
  "Thích Ca Phật Đài (Bà Rịa – Vũng Tàu)": { info: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", img: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", hot: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", blue: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU" },
  "Thích Ca Phật Đài": { info: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", img: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", hot: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU", blue: "THÍCH CA PHẬT ĐÀI-VŨNG TÀU" },
  "NHÀ THỜ ĐỨC BÀ": { info: "NHÀ THỜ ĐỨC BÀ SÀI GÒN", img: "NHÀ THỜ ĐỨC BÀ", hot: "NHÀ THỜ ĐỨC BÀ-TPHCM", blue: "NHÀ THỜ ĐỨC BÀ SÀI GÒN" },
  "Nhà thờ Đức Bà Sài Gòn": { info: "NHÀ THỜ ĐỨC BÀ SÀI GÒN", img: "NHÀ THỜ ĐỨC BÀ-TPHCM", hot: "NHÀ THỜ ĐỨC BÀ-TPHCM", blue: "NHÀ THỜ ĐỨC BÀ SÀI GÒN" },
  "Nhà thờ Đức Bà": { info: "NHÀ THỜ ĐỨC BÀ SÀI GÒN", img: "NHÀ THỜ ĐỨC BÀ-TPHCM", hot: "NHÀ THỜ ĐỨC BÀ-TPHCM", blue: "NHÀ THỜ ĐỨC BÀ SÀI GÒN" },
  "CHỢ THỦ DẦU MỘT": { info: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG", img: "CHỢ THỦ DẦU MỘT", hot: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG", blue: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG" },
  "Chợ Thủ Dầu Một": { info: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG", img: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG", hot: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG", blue: "CHỢ THỦ DẦU MỘT-BÌNH DƯƠNG" },
  "CHỢ BẾN THÀNH": { info: "CHỢ BẾN THÀNH", img: "CHỢ BẾN THÀNH", hot: "CHỢ BẾN THÀNH-TPHCM", blue: "CHỢ BẾN THÀNH" },
  "Chợ Bến Thành - TP.HCM": { info: "CHỢ BẾN THÀNH", img: "CHỢ BẾN THÀNH-TPHCM", hot: "CHỢ BẾN THÀNH-TPHCM", blue: "CHỢ BẾN THÀNH" },
  "Chợ Bến Thành": { info: "CHỢ BẾN THÀNH", img: "CHỢ BẾN THÀNH-TPHCM", hot: "CHỢ BẾN THÀNH-TPHCM", blue: "CHỢ BẾN THÀNH" },
  "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH": { info: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH", img: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH", hot: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH-TPHCM", blue: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH" },
  "Đường sách Nguyễn Văn Bình": { info: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH", img: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH-TPHCM", hot: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH-TPHCM", blue: "ĐƯỜNG SÁCH NGUYỄN VĂN BÌNH" },
  "CHỢ XÓM LƯỚI": { info: "CHỢ XÓM LƯỚI-VŨNG TÀU", img: "CHỢ XÓM LƯỚI", hot: "CHỢ XÓM LƯỚI-VŨNG TÀU", blue: "CHỢ XÓM LƯỚI-VŨNG TÀU" },
  "Chợ Xóm Lưới (khu vực Vũng Tàu)": { info: "CHỢ XÓM LƯỚI-VŨNG TÀU", img: "CHỢ XÓM LƯỚI-VŨNG TÀU", hot: "CHỢ XÓM LƯỚI-VŨNG TÀU", blue: "CHỢ XÓM LƯỚI-VŨNG TÀU" },
  "Chợ Xóm Lưới": { info: "CHỢ XÓM LƯỚI-VŨNG TÀU", img: "CHỢ XÓM LƯỚI-VŨNG TÀU", hot: "CHỢ XÓM LƯỚI-VŨNG TÀU", blue: "CHỢ XÓM LƯỚI-VŨNG TÀU" },
  "Làng sơn mài Tương Bình Hiệp": { info: "LÀNG SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG", img: "LÀNG NGHỀ SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG", hot: "LÀNG NGHỀ SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG", blue: "LÀNG SƠN MÀI TƯƠNG BÌNH HIỆP-BÌNH DƯƠNG" },
  "Đờn Ca Tài Tử Nam Bộ": { info: "ĐỜN CA TÀI TỬ NAM BỘ", img: "ĐỜN CA TÀI TỬ-TPHCM", hot: "ĐỜN CA TÀI TỬ-TPHCM", blue: "ĐỜN CA TÀI TỬ NAM BỘ" },
  "Nghệ Thuật Cải Lương Nam Bộ": { info: "NGHỆ THUẬT CẢI LƯƠNG NAM BỘ", img: "NGHỆ THUẬT SÂN KHẤU CẢI LƯƠNG NAM BỘ", hot: "NGHỆ THUẬT SÂN KHẤU CẢI LƯƠNG NAM BỘ", blue: "NGHỆ THUẬT CẢI LƯƠNG NAM BỘ" },
  "Lễ Hội Nghinh Ông (Bà Rịa – Vũng Tàu)": { info: "LỄ HỘI NGHINH ÔNG THẮNG TAM-VŨNG TÀU", img: "LỄ HỘI NGHINH ÔNG THẮNG TAM VŨNG TÀU", hot: "LỄ HỘI NGHINH ÔNG THẮNG TAM VŨNG TÀU", blue: "LỄ HỘI NGHINH ÔNG THẮNG TAM-VŨNG TÀU" },
  "Thành phố Mới Bình Dương": { info: "THÀNH PHỐ MỚI BÌNH DƯƠNG", img: "THÀNH PHỐ MỚI BÌNH DƯƠNG", hot: "THÀNH PHỐ MỚI BÌNH DƯƠNG", blue: "THÀNH PHỐ MỚI BÌNH DƯƠNG" },
  "Hồ Dầu Tiếng - Bình Dương": { info: "HỒ DẦU TIẾNG-BÌNH DƯƠNG", img: "HỒ DẦU TIẾNG-BÌNH DƯƠNG", hot: "HỒ DẦU TIẾNG-BÌNH DƯƠNG", blue: "HỒ DẦU TIẾNG-BÌNH DƯƠNG" },
  "Hồ Dầu Tiếng": { info: "HỒ DẦU TIẾNG-BÌNH DƯƠNG", img: "HỒ DẦU TIẾNG-BÌNH DƯƠNG", hot: "HỒ DẦU TIẾNG-BÌNH DƯƠNG", blue: "HỒ DẦU TIẾNG-BÌNH DƯƠNG" },
  "Bãi Sau (Bãi Thùy Vân) - Vũng Tàu": { info: "BÃI SAU VŨNG TÀU", img: "BÃI SAU-VŨNG TÀU", hot: "BÃI SAU-VŨNG TÀU", blue: "BÃI SAU VŨNG TÀU" },
  "Bãi Sau": { info: "BÃI SAU VŨNG TÀU", img: "BÃI SAU-VŨNG TÀU", hot: "BÃI SAU-VŨNG TÀU", blue: "BÃI SAU VŨNG TÀU" },
  "Làng Chài Phước Hải - Bà Rịa – Vũng Tàu": { info: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU", img: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU", hot: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU", blue: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU" },
  "Làng Chài Phước Hải": { info: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU", img: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU", hot: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU", blue: "LÀNG CHÀI PHƯỚC HẢI-BÀ RỊA VŨNG TÀU" },
  "PHỐ ĐI BỘ NGUYỄN HUỆ": { info: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM", img: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM", hot: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM", blue: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM" },
  "Phố đi bộ Nguyễn Huệ": { info: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM", img: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM", hot: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM", blue: "PHỐ ĐI BỘ NGUYỄN HUỆ-TPHCM" }
};

// Master retriever with fallback & dynamic enrichment
export function getPlaceInfographic(placeName: string, categoryTitle?: string): PlaceInfographicMeta {
  const mapping = PLACE_KEY_MAPPINGS[placeName];
  const infoKey = mapping ? mapping.info : placeName;
  const imgKey = mapping ? mapping.img : placeName;
  const hotKey = mapping ? mapping.hot : placeName;
  const blueKey = mapping ? mapping.blue : placeName;

  const existing = PLACE_INFOGRAPHICS[infoKey] || PLACE_INFOGRAPHICS[placeName];
  const masterImg = PLACE_MASTER_IMAGES[imgKey] || PLACE_MASTER_IMAGES[placeName] || (existing ? existing.masterImage : infographicLichSu);
  
  if (existing) {
    const defaultHotspots = LANDMARK_HOTSPOTS[hotKey] || LANDMARK_HOTSPOTS[placeName] || [
      { id: 1, x: 50, y: 25, title: "Điểm nhấn kiến trúc trung tâm", category: "Kiến trúc", description: existing.visualHighlights[0] || "Đặc trưng nổi bật của công trình.", tag: "Kiến trúc" },
      { id: 2, x: 35, y: 60, title: "Dấu ấn lịch sử", category: "Lịch sử", description: existing.milestones[0]?.event || "Dấu mốc hình thành di sản.", tag: "Lịch sử" },
      { id: 3, x: 65, y: 75, title: "Giá trị văn hóa đời sống", category: "Văn hóa", description: existing.pedagogicalTakeaways[0] || "Ý nghĩa giáo dục truyền thống.", tag: "Văn hóa" }
    ];

    const blueprint = getBlueprintData(placeName, existing);
    
    // Calculate heritage years
    let heritageYears = 100;
    const yearMatch = existing.yearEstablished.match(/\d{4}/);
    if (yearMatch) {
      heritageYears = Math.max(10, 2026 - parseInt(yearMatch[0], 10));
    }

    const colorMeanings: ColorMeaning[] = (existing.colorPalette || ["#c29b38", "#1a2a44", "#8b0000"]).map((hex, idx) => {
      const names = ["Vàng Thổ Hoàng Hoàng Gia", "Xanh Hải Quân Bến Nghé", "Đỏ Gạch Marseille Trần", "Nâu Gỗ Cổ Tự Nam Bộ"];
      const meanings = [
        "Màu sắc biểu trưng của ánh sáng tri thức, quyền quý và kiến trúc thuộc địa Đông Dương.",
        "Màu của sông nước Cửu Long, biển cả duyên hải và tinh thần hội nhập rộng mở.",
        "Màu của gạch ngói bền vững qua mưa nắng nhiệt đới, tượng trưng lòng quả cảm kiên trung.",
        "Màu của gỗ quý mộc mạc và đất phù sa màu mỡ nuôi dưỡng ngàn đời văn hóa phương Nam."
      ];
      return {
        hex,
        name: names[idx % names.length],
        percentage: idx === 0 ? 45 : idx === 1 ? 30 : idx === 2 ? 15 : 10,
        meaning: meanings[idx % meanings.length]
      };
    });

    return {
      ...existing,
      masterImage: masterImg,
      hotspots: defaultHotspots,
      blueprint,
      heritageAgeYears: heritageYears,
      significanceLevel: existing.keyClassification,
      colorMeanings
    };
  }

  // Fallback for custom place
  return {
    placeName,
    category: "lich_su",
    categoryTitle: categoryTitle || "Di tích & Danh thắng Nam Bộ",
    masterImage: masterImg,
    yearEstablished: "Thế kỷ 19 – 20",
    heritageAgeYears: 120,
    significanceLevel: "Di tích Lịch sử - Văn hóa",
    architectOrOrigin: "Cộng đồng cư dân Nam Bộ sáng lập",
    keyClassification: "Di tích Văn hóa Cấp Quốc gia",
    dimensionsOrScale: "Quy mô kiến trúc và cảnh quan văn hóa đặc trưng",
    colorPalette: ["#c29b38", "#1e293b", "#0284c7", "#f8fafc"],
    aiImagePrompt: `A museum-quality educational infographic poster of ${placeName}, Southern Vietnam cultural heritage. Showing key architectural elements, timeline, data badges, warm golden and deep navy tones.`,
    milestones: [
      { year: "Khởi lập", event: `Hình thành và xác lập vị trí văn hóa của ${placeName} trong đời sống phương Nam.` },
      { year: "Phát triển", event: `Trở thành biểu tượng văn hóa được cộng đồng gìn giữ và tôn vinh.` },
      { year: "Hiện nay", event: `Điểm sáng học tập trải nghiệm trong kho học liệu di sản HCMC CultureHub.` }
    ],
    visualHighlights: [
      "Hài hòa với cảnh quan thiên nhiên và sông nước Nam Bộ",
      "Kỹ nghệ xây dựng truyền thống kết hợp bàn tay tài hoa của nghệ nhân",
      "Biểu tượng gắn kết tình làng nghĩa xóm và lòng yêu quê hương đất nước"
    ],
    keyDataPoints: [
      { label: "Di sản", value: placeName },
      { label: "Bảo tồn", value: "Nguyên vẹn" },
      { label: "Học liệu", value: "HCMC CultureHub" },
      { label: "Trải nghiệm", value: "Thực địa sinh động" }
    ],
    pedagogicalTakeaways: [
      `Khám phá giá trị lịch sử và nhân văn sâu sắc của ${placeName}.`,
      "Nâng cao tinh thần trách nhiệm bảo vệ di sản văn hóa dân tộc."
    ],
    hotspots: [
      { id: 1, x: 50, y: 30, title: "Điểm nhấn trung tâm", category: "Kiến trúc", description: `Kiến trúc đặc sắc của ${placeName}.` },
      { id: 2, x: 30, y: 65, title: "Khuôn viên di sản", category: "Cảnh quan", description: "Không gian mở kết nối cộng đồng." },
      { id: 3, x: 70, y: 70, title: "Giá trị văn hóa", category: "Văn hóa", description: "Học liệu quý cho thế hệ trẻ." }
    ],
    blueprint: {
      orientation: "Hướng gió Nam Bộ • Đông Nam",
      materials: ["Gỗ quý truyền thống", "Gạch nung bản địa", "Đá granite", "Ngói âm dương"],
      scale: "Quy mô tiêu chuẩn di sản",
      architecturalStyle: "Phong cách Nam Bộ truyền thống",
      gridCoords: "10°45'N • 106°40'E"
    }
  };
}
