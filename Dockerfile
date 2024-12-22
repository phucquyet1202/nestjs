# sử dụng image nodejs phiên bản 20
FROM node:20
# thiết lập thư mục làm việc bên trong container
WORKDIR /app
# sao chép file package.json và package-lock.json vào container
COPY  package*.json .
# cài đặt các package
RUN npm install
# Tải biến môi trường từ tệp .env COPY .env .env

# Sao chép toàn bộ mã nguồn của dự án
COPY . .
# Mở cổng mà ứng dụng sẽ lắng nghe
EXPOSE 8080
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Lệnh để khởi động ứng dụng
CMD ["npm","run", "dev"]