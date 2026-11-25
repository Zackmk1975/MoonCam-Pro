MOONCAM PRO v1.6 — PLAY & RECORD
================================

THÊM MỚI
- Tab Trò chơi: ba mini game Thiên thạch / 2048 / Săn sao.
- Khi game chạy, camera và MediaRecorder vẫn nằm trong trang MoonCam chính.
- Đổi game / nút Chơi lại chỉ làm mới iframe game, KHÔNG gọi reload trang chính.
- Trên màn hình game: trạng thái ghi, đồng hồ, dung lượng dữ liệu đã nhận,
  bắt đầu quay / dừng và lưu, chụp ảnh, chơi lại và thoát game.
- Trò chơi độc lập trong sandbox, không yêu cầu cấp quyền camera hoặc micro.
- Ảnh/video lấy trực tiếp từ camera (không có hình ảnh trò chơi).
- Cập nhật service worker v1.6 để game có thể tải khi offline sau lần mở đầu.

LƯU Ý QUAN TRỌNG
- Sự độc lập ở đây là cấp giao diện / đoạn mã. Nếu game quá nặng khiến iPhone
  thiếu tài nguyên, FPS video vẫn có thể bị ảnh hưởng. 4K + game không được đảm bảo.
- Nút Chơi lại hoặc đổi game không tải lại trang MoonCam, nên không chủ động
  dừng camera hoặc MediaRecorder. Nhưng tải lại toàn bộ trang (Safari Refresh,
  đóng hẳn web app), khóa màn hình hoặc chuyển sang ứng dụng iOS khác VẪN có
  thể làm iOS ngắt camera/ghi hình. Không có quyền quay nền đặc biệt cho PWA.
- Dấu REC/đồng hồ là trạng thái MediaRecorder; bạn cần xem video đã lưu để
  kiểm tra khung hình thực sự, nhất là khi có gián đoạn.
- Âm thanh trong game được tắt để giảm nguy cơ âm thanh lọt vào micro.
- Tệp video chỉ lưu trong bộ nhớ cục bộ của web app, hãy tải về iPhone sau khi quay.

CÀI ĐẶT
1. Giải nén ZIP.
2. Upload *toàn bộ* thư mục, bao gồm index.html, sw.js, manifest.webmanifest,
   icons/ và games/ lên Netlify hoặc bất kỳ host HTTPS tĩnh nào.
3. Mở website trong Safari trên iPhone 15 Pro Max và thêm vào Màn hình chính.
4. Mở camera, cấp quyền, bấm nút quay, rồi chọn tab 'Trò chơi'.
5. Để thử không ngắt bản ghi: quay 15 giây -> mở game -> đổi game 2 lần ->
   chơi lại 3 lần -> trở lại camera -> dừng và lưu -> kiểm tra video thực tế.
6. Có thể thử khởi động game rồi mới bấm 'Bắt đầu quay' trong màn hình game.

KHẢ NĂNG TƯƠNG THÍCH
- Cần HTTPS (localhost dùng được khi thử trên máy tính).
- Tùy phiên bản iOS/Safari mà định dạng video, FPS, quyền camera và
  MediaRecorder có thể khác nhau. Chưa có bảo đảm 4K khi chơi game.
- Để hạn chế giật khung hình: ưu tiên 1080p/30fps và giảm hiệu ứng không cần thiết.
