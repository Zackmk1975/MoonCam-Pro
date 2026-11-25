MOONCAM PRO v1.8 — GAME EDITION — 2048 + METEOR (iPHONE)
===============================================

ĐÃ SỬA
- Giữ NGUYÊN id, start_url và scope trong manifest để giữ biểu tượng đã cài.
- Thêm version.json và updates.js để kiểm tra bản mới khi mở/đổi lại ứng dụng,
  và trong lúc đang sử dụng (định kỳ khoảng 5 phút).
- Service Worker: ưu tiên tải HTML, game và mã JS mới từ mạng; chỉ dùng cache cũ khi offline.
- Netlify _headers: không cho HTTP cache giữ mã index, worker và số phiên bản cũ.
- Tự cập nhật khi rảnh (camera tắt, không quay, không chơi game, không có dialog mở).
- Đang quay hoặc đang lưu: KHÔNG tải lại trang, không tự dừng MediaRecorder.
  Hoàn tất và tắt camera rồi bản mới mới được nạp.
- Có nút "Kiểm tra cập nhật" trong Cài đặt và thông báo khi có bản mới.
- Tất cả các tính năng của v1.6 được giữ nguyên: camera, video, chụp, thư viện,
  lớp che, mini game, nút tắt camera.

CẬP NHẬT LẦN NÀY
1. Giải nén và upload TOÀN BỘ thư mục này lên site Netlify đang dùng.
2. Giữ nguyên domain/site của Netlify. Không tạo site mới.
3. Mở biểu tượng cũ từ Màn hình chính của iPhone khi có internet.
4. Vì v1.6 chưa có chức năng kiểm tra cập nhật, lần đầu sau deploy có thể cần
   vuốt đóng HẲN MoonCam trong bộ chuyển ứng dụng rồi mở lại. Không cần xóa icon.
5. Vào Cài đặt → Cập nhật MoonCam → Kiểm tra cập nhật để kiểm tra những lần sau.
6. Các bản sau: cập nhật index.html, games, sw.js, version.json (tăng số version),
   updates.js nếu cần; triển khai toàn bộ thư mục lên Netlify cùng site cũ.

CHÚ Ý
- Website phải dùng HTTPS và có mạng để nhận bản cập nhật.
- iOS có thể giữ snapshot/cached app lâu hơn dự kiến; cập nhật không bảo đảm tức thì
  trên mọi phiên bản Safari/iOS. Đóng hẳn rồi mở lại thường giúp.
- Reload toàn trang sẽ dừng camera/MediaRecorder: bản mới chủ động đợi phiên quay
  hoàn tất; người dùng không nên dùng nút reload/đóng web khi chưa lưu xong video.
- Thư viện là IndexedDB nội bộ của MoonCam, không xóa khi cập nhật. Tuy nhiên,
  nếu đổi domain, xóa dữ liệu website hoặc iOS dọn dẹp bộ nhớ thì có thể mất file.
  Hãy tải video quan trọng ra ứng dụng Tệp/Ảnh trên iPhone.
- Quay nền khi vuốt sang ứng dụng iOS khác VẪN bị giới hạn, không thể cấp quyền
  nền cho PWA từ các thiết lập Safari.

NÂNG CẤP v1.8
- Chỉ còn Thiên thạch và 2048; loại bỏ toàn bộ file Săn sao.
- Bàn 2048 tận dụng chiều rộng/chiều cao của khung game, số tự co để không tràn ô (kể cả số nhiều chữ số), có hoàn tác.
- Meteor Dash điều khiển chạm mượt hơn, khiên năng lượng, combo, bất tử ngắn sau va chạm, tạm dừng và các cấp độ.
- Game nằm trong iframe riêng, đổi game/chơi lại không yêu cầu làm mới trang camera hoặc dừng MediaRecorder.
- Bản v1.8 vẫn dùng PWA auto update từ v1.7; chỉ tải lại trang sau khi không còn dùng camera hoặc chơi game.
- Với iPhone, mở biểu tượng cũ, thoát game và tắt camera để ứng dụng có thể cập nhật sau khi triển khai.
