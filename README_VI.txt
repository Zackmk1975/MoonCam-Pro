MOONCAM PRO – WEB APP CHO IPHONE 15 PRO MAX
=======================================

1. HƯỚNG DẪN ĐƯA LÊN WEB (KHÔNG CẦN CODE)
- Giải nén ZIP, giữ nguyên thư mục gồm index.html, sw.js, manifest.webmanifest và icons/.
- Vào https://app.netlify.com/drop (Netlify Drop) trên máy tính.
- Kéo toàn bộ thư mục mooncam_pro chứa index.html vào trang.
- Netlify cung cấp URL HTTPS kiểu https://<ten-ngau-nhien>.netlify.app.
- Mở URL đó trong SAFARI trên iPhone.
- Safari → Chia sẻ → Thêm vào Màn hình chính → Thêm.
- Khởi chạy MoonCam Pro từ biểu tượng ngoài màn hình chính, nhấn Bật camera và cấp quyền.

2. CHỨC NĂNG
- Quay camera trước/sau với âm thanh (khi cho phép).
- Có thể yêu cầu 720p, 1080p hoặc 4K, FPS 24/30/60. Độ phân giải cuối cùng tùy camera và Safari.
- Nút chụp ảnh JPEG.
- Zoom bằng phần cứng chỉ khi Safari thực sự hỗ trợ API zoom.
- Lưu thư viện video/ảnh trên thiết bị qua IndexedDB, rồi tải video sang Tệp/Ảnh.
- Có bản sao dữ liệu ghi tạm theo đoạn để thử khôi phục nếu bị gián đoạn (không bảo đảm tệp MP4 phát được).
- Giao diện PWA standalone, hoạt động không cần mạng sau lần tải đầu nếu được lưu cache.

3. GIỚI HẠN QUAN TRỌNG
- Web app KHÔNG bảo đảm quay camera tiếp khi chuyển hẳn sang ứng dụng khác hoặc khóa iPhone.
- iOS có thể dừng hoặc tắt camera khi app vào nền; các khung hình có thể bị thiếu.
- WebKit đôi khi gặp lỗi camera trong PWA; nếu không cấp quyền được hãy thử bằng Safari.
- Ứng dụng cần HTTPS. Mở trực tiếp index.html bằng Tệp không cấp được quyền camera như web HTTPS.
- Dung lượng lưu IndexedDB có giới hạn và có thể bị hệ thống xóa. Tải video về ngay sau khi quay.
- Không cần server phụ trợ; video không được gửi đi.
- Thao tác 4K/60FPS và quay tele riêng không được bảo đảm trên Safari.

4. QUYỀN RIÊNG TƯ
- Toàn bộ xử lý camera/lưu trữ nằm trên trình duyệt; không upload tệp nào tới máy chủ.
- Phải tự cấp quyền cho camera/micro khi website yêu cầu.

5. TÙY CHỈNH
- Có thể đổi tên và icon trong manifest.webmanifest và thư mục icons.
- Thay đổi màu, chữ và bố cục trong index.html.

Phiên bản: 1.0
