MOONCAM PRO v1.9 — TỰ CHƠI MOON 2048 (AI)
=======================================

TÍNH NĂNG MỚI:
- Mở tab Trò chơi -> 2048 -> nút “▶ Tự chơi”. AI tự chọn hướng di chuyển.
- Thuật toán: Expectimax có đánh giá ô trống, thứ tự ô lớn, khả năng ghép và độ mượt.
- AI tiếp tục sau khi đạt 2048; chỉ dừng khi hết nước hoặc khi bạn bấm “⏸ Dừng AI”.
- Chọn 1×, 2×, 4× để thay đổi tốc độ (nhấn lặp lại vào nút tốc độ).
- Khi người dùng tự vuốt/lùi, AI tự dừng để tránh tranh chấp.
- Khi đóng màn hình game, thuật toán tạm dừng; khi mở lại có thể tiếp tục.
- Nút Chơi mới khi AI đang chạy sẽ thay bảng 2048 và tiếp tục tự chơi.
- Hệ thống không tải lại trang Camera khi chơi, đổi game hoặc chơi lại.
- Game 2048 nằm trong iframe riêng, không sử dụng luồng video hay đối tượng MediaRecorder.

LƯU Ý:
- Vì ô 2/4 xuất hiện ngẫu nhiên, AI KHÔNG bảo đảm đạt 2048/4096 ở mọi ván.
- “Đến giới hạn” được hiểu là tự chơi đến khi KHÔNG còn nước đi hợp lệ, không giới hạn tại số 2048.
- Chọn 1× nếu quay 4K hoặc máy nóng; tăng tốc sẽ tăng tải CPU và pin.
- iOS vẫn có thể gián đoạn camera nếu thoát hẳn sang ứng dụng khác, khoá máy hoặc tải lại toàn bộ trang.

CẬP NHẬT:
1. Giải nén ZIP và triển khai TOÀN BỘ thư mục lên đúng site Netlify hiện tại.
2. Giữ nguyên domain; mở PWA từ biểu tượng ngoài màn hình chính.
3. Hãy dừng quay, tắt camera, đóng game khi cần nạp cập nhật; v1.9 giữ AutoUpdater.
4. Giữ nguyên id/start_url/scope trong manifest để không cần thêm lại biểu tượng.
5. Thư viện lưu video trong IndexedDB, không được cố ý xóa khi nâng cấp. Hãy sao lưu video quan trọng trước khi thử.
