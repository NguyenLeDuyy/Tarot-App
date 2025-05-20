# Dự án Website Bói Bài Tarot

Chào mừng bạn đến với dự án website bói bài Tarot! Trang web này cho phép người dùng trải nghiệm đọc bài Tarot, nhận luận giải từ AI, và nhiều tính năng khác.

## Tổng Quan Dự Án

Dự án bao gồm hai phần chính:

1.  **Frontend (Giao diện người dùng):** Được xây dựng bằng React (với Vite) và TypeScript. Đây là phần mà người dùng sẽ tương tác trực tiếp trên trình duyệt.
2.  **Backend (Máy chủ):** Được xây dựng bằng Node.js, Express, và kết nối với cơ sở dữ liệu MongoDB. Phần này xử lý logic nghiệp vụ, quản lý dữ liệu người dùng, và tương tác với AI để đưa ra luận giải.

## Yêu Cầu Cần Có

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các phần mềm sau trên máy tính:

*   **Node.js và npm:** Bạn có thể tải về từ [trang chủ Node.js](https://nodejs.org/). npm (Node Package Manager) sẽ được cài đặt cùng với Node.js.
*   **Git:** Cần thiết để quản lý mã nguồn và lấy code từ GitHub. Tải về từ [trang chủ Git](https://git-scm.com/).
*   **(Tùy chọn nhưng khuyến khích) Một trình soạn thảo mã nguồn (Code Editor):** Ví dụ như [Visual Studio Code](https://code.visualstudio.com/).

## Hướng Dẫn Cài Đặt và Chạy Dự Án

Làm theo các bước sau để thiết lập và chạy dự án trên máy tính của bạn.

### 1. Lấy Mã Nguồn Dự Án

Mở Terminal (hoặc Command Prompt/PowerShell trên Windows) và chạy lệnh sau để sao chép (clone) dự án từ GitHub về máy:

```bash
git clone https://github.com/NguyenLeDuyy/Tarot-App.git
```

Sau đó, di chuyển vào thư mục dự án vừa tải về:

```bash
cd Tarot-App
```

Hoặc nếu bạn đã có thư mục dự án và muốn cập nhật code mới nhất:

```bash
cd Tarot-App
git pull origin https://github.com/NguyenLeDuyy/Tarot-App.git
```

### 2. Cài Đặt và Chạy Frontend (Giao diện người dùng)

Phần frontend nằm trong thư mục `tarot-app` (thư mục gốc sau khi clone).

a.  **Di chuyển vào thư mục frontend:**
    Nếu bạn đang ở thư mục `Tarot-App`, bạn đã ở đúng vị trí cho frontend.

b.  **Cài đặt các thư viện cần thiết:**
    Chạy lệnh sau để cài đặt các gói phụ thuộc được định nghĩa trong file `package.json`.

    ```bash
npm install
    ```

c.  **Chạy ứng dụng frontend:**
    Lệnh này sẽ khởi động server phát triển cho frontend.

    ```bash
npm run dev
    ```
    Sau khi chạy thành công, bạn sẽ thấy một địa chỉ (thường là `http://localhost:5173` hoặc tương tự) trong terminal. Mở trình duyệt và truy cập địa chỉ đó để xem trang web.

### 3. Cài Đặt và Chạy Backend (Máy chủ)

Phần backend nằm trong thư mục `tarot-backend`.

a.  **Mở một cửa sổ Terminal mới** (hoặc tab mới trong terminal hiện tại). Điều này quan trọng vì bạn cần giữ cho server frontend chạy ở terminal trước.

b.  **Di chuyển vào thư mục backend:**
    Từ thư mục gốc `Tarot-App`, chạy lệnh:

    ```bash
cd tarot-backend
    ```

c.  **Cài đặt các thư viện cần thiết cho backend:**

    ```bash
    npm install
    ```

d.  **Cấu hình Biến Môi Trường (Quan trọng!):**
    Backend cần một API key để kết nối với dịch vụ AI (Gemini) và một chuỗi kết nối để liên kết với cơ sở dữ liệu MongoDB.
    *   Tạo một file tên là `.env` trong thư mục `tarot-backend`.
    *   Thêm các dòng sau vào file `.env`, thay thế các giá trị placeholder bằng thông tin thực tế của bạn:

        ```env
        MONGODB_URI=your_mongodb_connection_string_here
        GEMINI_API_KEY=your_gemini_api_key_here
        PORT=5000
        ```
        *   `your_mongodb_connection_string_here`: Lấy từ MongoDB Atlas (phải bao gồm tên database, ví dụ: `mongodb+srv://user:pass@cluster.mongodb.net/tarot-app?retryWrites=true&w=majority`)
        *   `your_gemini_api_key_here`: Lấy từ Google AI Studio.
        *   `PORT=5000`: Đây là cổng mặc định cho backend, có thể thay đổi nếu cần.

e.  **Chạy ứng dụng backend:**
    Lệnh này sẽ khởi động server backend. `nodemon` giúp tự động khởi động lại server khi có thay đổi trong code. Nếu chưa cài `nodemon`, bạn có thể cài bằng `npm install -g nodemon` (cài đặt toàn cục) hoặc `npm install --save-dev nodemon` (cài đặt cho dự án) và chạy bằng `npx nodemon server.js`.

    ```bash
    nodemon server.js
    ```
    Hoặc nếu không dùng `nodemon`:
    ```bash
    node server.js
    ```
    Server backend sẽ chạy (thường ở `http://localhost:5000`).

### Tóm Tắt Các Lệnh Chính (Sau Khi Cài Đặt Xong)

*   **Để chạy Frontend:**
    1.  `cd tarot-app` (nếu bạn đang ở thư mục gốc của dự án)
    2.  `npm run dev`

*   **Để chạy Backend (trong một terminal khác):**
    1.  `cd tarot-app/tarot-backend` (nếu bạn đang ở thư mục gốc của dự án)
    2.  `nodemon server.js`

## Các Công Nghệ Chính Sử Dụng

*   **Frontend:**
    *   ReactJS (thư viện JavaScript để xây dựng giao diện người dùng)
    *   Vite (công cụ build và server phát triển nhanh)
    *   TypeScript (ngôn ngữ lập trình xây dựng trên JavaScript, thêm kiểu tĩnh)
    *   Tailwind CSS (framework CSS để tạo kiểu nhanh chóng)
*   **Backend:**
    *   Node.js (môi trường chạy JavaScript phía server)
    *   Express.js (framework cho Node.js để xây dựng API)
    *   MongoDB (cơ sở dữ liệu NoSQL)
    *   Mongoose (thư viện để làm việc với MongoDB một cách dễ dàng hơn)
    *   Google Gemini API (cho tính năng luận giải Tarot bằng AI)
*   **Khác:**
    *   Git & GitHub (quản lý phiên bản mã nguồn)

## Ghi Chú Thêm

*   Khi bạn thực hiện thay đổi code ở frontend, trang web trên trình duyệt thường sẽ tự động cập nhật (Hot Module Replacement).
*   Khi bạn thay đổi code ở backend, `nodemon` sẽ tự động khởi động lại server.
*   Đảm bảo cả server frontend và backend đều đang chạy để ứng dụng hoạt động đầy đủ.

---

Phần ESLint nâng cao đã được lược bỏ để tập trung vào hướng dẫn cài đặt cơ bản. Nếu cần, chúng ta có thể thêm lại sau.
