# 🌱 IoT Nông nghiệp & Môi trường — học từ số 0 đến hệ thống thực tế

> **Tài liệu học trực tuyến mở bằng tiếng Việt** dành cho người mới bắt đầu, đi từ điện tử – vi điều khiển – cảm biến – mạng – dữ liệu – điều khiển đến các hệ thống **tưới thông minh, nhà kính/indoor growing, Aquaponics, giám sát chất lượng không khí, trạm mưa – môi trường và LoRa/LoRaWAN**.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Language](https://img.shields.io/badge/Ngôn%20ngữ-Tiếng%20Việt-blue)
![Level](https://img.shields.io/badge/Trình%20độ-Cơ%20bản%20→%20Nâng%20cao-orange)

**Phát triển:** Long Ngo  
**Giấy phép nội dung/mã nguồn của repository:** MIT  
**Mục tiêu:** học để hiểu bản chất, sau đó tự lắp – đo – truyền dữ liệu – điều khiển – kiểm thử được một hệ IoT nhỏ ngay tại nhà/phòng học và biết cách nâng cấp lên hệ thống hiện trường.

> [!IMPORTANT]
> Các tài liệu tham khảo bên thứ ba (giáo trình, tiêu chuẩn, tài liệu FAO/NIST/OASIS/LoRa Alliance, tài liệu nhà sản xuất…) **không được tái cấp phép theo MIT**. MIT chỉ áp dụng cho phần nội dung/mã nguồn do repository này phát triển, trừ khi có ghi chú khác.

## 🚀 Học ngay

Mở [`index.html`](index.html) để dùng giao diện khóa học. Giao diện có:

- lộ trình 18 bài từ cơ bản đến nâng cao;
- lọc theo cấp độ/chủ đề;
- mục tiêu học tập, kiến thức nền, kiến trúc, ưu/nhược điểm;
- bài thực hành “làm được ngay”, BOM và checklist kiểm thử;
- câu hỏi tự kiểm tra có phản hồi;
- lưu tiến độ bằng `localStorage` ngay trên trình duyệt;
- tài liệu tham khảo APA và phân biệt rõ **nguồn gốc tài liệu** / **kiến thức cập nhật từ tiêu chuẩn chính thức**.

Nếu dùng GitHub Pages: **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**. Sau khi Pages được bật, `index.html` sẽ là trang khóa học.

## 🧭 Lộ trình 18 bài

| Chặng | Bài | Kết quả chính |
|---|---|---|
| **A. Nền tảng** | 01–04 | Hiểu IoT là hệ thống cyber-physical; điện tử căn bản; Arduino/ESP32; cảm biến và hiệu chuẩn |
| **B. Kết nối & dữ liệu** | 05–08 | Wi‑Fi/HTTP; MQTT; mô hình dữ liệu/dashboard; relay/MOSFET, điều khiển và fail-safe |
| **C. Nông nghiệp & môi trường** | 09–13 | Tưới theo độ ẩm đất; nhà kính/indoor; Aquaponics; IAQ; mưa–thời tiết–cảnh báo |
| **D. Hiện trường** | 14–16 | LoRa/LoRaWAN; năng lượng/solar/deep-sleep; độ tin cậy và an toàn IoT |
| **E. Đồ án** | 17–18 | Tích hợp smart farm và triển khai capstone có đo lường, nhật ký, kiểm thử |

## 🧠 Triết lý học

Mỗi bài đều đi theo một vòng lặp cố định:

**Vấn đề thực tế → Bản chất/nguyên lý → Kiến trúc → Linh kiện/giao thức → Lắp thử → Đo và kiểm chứng → Phân tích lỗi → Ưu/nhược → Bài nâng cấp.**

Không học theo kiểu “copy code rồi cầu may”. Mỗi lab luôn yêu cầu người học ghi lại **đơn vị đo, khoảng hợp lệ, sai số, chu kỳ lấy mẫu, điều kiện lỗi và phản ứng an toàn**.

## 🧩 Kiến trúc tham chiếu

```text
[Môi trường/vật lý]
        ↓
[Cảm biến] → [MCU/Edge: Arduino/ESP32] → [Wi‑Fi / LoRaWAN]
        ↓                 ↓                        ↓
   dữ liệu thô       lọc/hiệu chuẩn           Gateway/Router
                          ↓                        ↓
                    [MQTT/HTTP] → [Server/Broker] → [DB/Dashboard]
                          ↑                              ↓
                    [Luật điều khiển] ← [Cảnh báo/Người dùng]
                          ↓
                  [MOSFET/Relay/Driver]
                          ↓
                [Bơm/Quạt/Van/Đèn]

Security, nguồn điện, logging và fail-safe là các lớp xuyên suốt toàn hệ thống.
```

Cấu trúc này tương thích với mô hình thực hành trong tài liệu LoRa nông nghiệp của Bách khoa Hà Nội: node cảm biến thu nhiệt độ/độ ẩm/độ ẩm đất, node tải điều khiển bơm và gateway đưa dữ liệu lên web/MQTT; nhưng khóa học tách rõ **LoRa (lớp vô tuyến/PHY)** và **LoRaWAN (giao thức mạng chuẩn)** để tránh nhầm lẫn.

## 🧰 Bộ kit khuyến nghị

### Starter — ưu tiên an toàn điện áp thấp

- 1 × ESP32 DevKit (khuyến nghị cho lộ trình chính) **hoặc** Arduino UNO cho bài nhập môn;
- breadboard + jumper;
- LED + điện trở 220 Ω / 1 kΩ / 10 kΩ;
- nút nhấn;
- BME280 **hoặc** DHT22;
- cảm biến ánh sáng/potentiometer để học ADC;
- cảm biến độ ẩm đất **điện dung**;
- module MOSFET logic-level hoặc relay module có cách ly phù hợp;
- bơm DC 5–12 V + nguồn riêng, diode bảo vệ nếu tải cảm;
- phao mức nước;
- DS18B20 chống nước cho bài Aquaponics;
- đồng hồ vạn năng.

### Nâng cao

- pH probe + mạch giao tiếp (cần dung dịch chuẩn và quy trình hiệu chuẩn);
- EC/TDS (học nguyên tắc đo, không coi TDS là “dinh dưỡng tuyệt đối”);
- cảm biến PM2.5 / CO₂ cho môi trường trong nhà;
- node LoRa/LoRaWAN + gateway phù hợp vùng tần số hợp pháp;
- pin/solar + mạch sạc/bảo vệ.

> [!WARNING]
> Khóa học mặc định **không yêu cầu đấu trực tiếp điện lưới 110/220/230 V**. Người mới chỉ thực hành tải DC điện áp thấp. Bơm/đèn/quạt điện lưới phải dùng thiết bị đóng cắt đạt chuẩn và người có chuyên môn điện thực hiện.

## 🌿 Các đồ án ứng dụng

1. **Tưới thông minh:** đo ẩm đất → hysteresis → bơm → log độ ẩm trước/sau tưới.
2. **Nhà kính / indoor growing:** nhiệt độ, RH, ánh sáng, ẩm giá thể → quạt/đèn/bơm → lịch và cảnh báo.
3. **Aquaponics:** nhiệt độ nước, mức nước, lưu lượng, pH (nâng cao) → cảnh báo; ưu tiên giám sát trước khi tự động hóa hóa chất.
4. **Indoor environmental monitoring:** PM/CO₂/nhiệt độ/RH → dashboard → quy tắc thông gió; học giới hạn của cảm biến giá rẻ.
5. **Trạm mưa/môi trường:** tipping bucket hoặc cảm biến mưa → đếm xung → lượng mưa tích lũy → truyền xa → cảnh báo.
6. **Smart farm LoRaWAN:** end-device ngủ sâu → uplink → gateway → network/application server → MQTT → dashboard.

## 📚 Cơ sở tài liệu

Khóa học được biên soạn từ hai lớp nguồn:

**(1) Tài liệu nền do người dùng cung cấp:** giáo trình cấu kiện điện tử; hướng dẫn Arduino UNO; sách IoT cho người mới; đồ án LoRa trong tự động hóa nông nghiệp; luận văn hệ đo mưa/cảnh báo trượt đất. Chúng cung cấp ngữ cảnh học tiếng Việt, mạch thực hành và các case study thực tế.

**(2) Nguồn chính thức dùng để xác thực/cập nhật:** Arduino Documentation, Espressif ESP‑IDF, OASIS MQTT 5.0, LoRa Alliance specifications, NIST IoT Cybersecurity, FAO về Aquaponics/greenhouse, US EPA về cảm biến chất lượng không khí trong nhà.

Danh mục APA đầy đủ: [`REFERENCES.md`](REFERENCES.md).

## 🗂️ Cấu trúc repository

```text
IoT/
├── README.md
├── LICENSE
├── REFERENCES.md
├── index.html
└── assets/
    ├── styles.css
    ├── course.js
    └── app.js
```

## 🤝 Đóng góp

Ưu tiên pull request có một trong các nội dung: sửa lỗi kỹ thuật, bổ sung sơ đồ nối dây, thêm lab đã kiểm thử, cải thiện khả năng tiếp cận, thêm nguồn chính thức/tiêu chuẩn, hoặc bổ sung case study nông nghiệp–môi trường tại Việt Nam.

Khi thêm ngưỡng điều khiển cho cây/cá/chất lượng môi trường, hãy ghi rõ **loài/cây, giai đoạn, cảm biến, đơn vị, điều kiện đo, nguồn tham khảo và mức độ tin cậy**. Tránh biến một con số tham khảo thành “ngưỡng đúng cho mọi hệ thống”.

## 📜 License

MIT © 2026 Long Ngo. Xem [`LICENSE`](LICENSE).
