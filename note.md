- @Inject: Được sử dụng để tiêm một phụ thuộc vào constructor hoặc phương thức của class, giúp NestJS quản lý sự phụ thuộc một cách tự động.
- inject: Được sử dụng trong các cấu hình bất đồng bộ, như forRootAsync, để chỉ ra các dịch vụ hoặc giá trị cần được tiêm vào trong một factory function.
- Lợi ích của .exec()

* Rõ ràng về ý định:

- Khi dùng .exec(), bạn thể hiện rõ ràng rằng bạn đang thực thi query. Điều này rất hữu ích trong các query phức tạp hoặc khi bạn làm việc với nhiều loại query khác nhau (ví dụ: .aggregate() yêu cầu .exec()).
  Kiểm soát tốt hơn quá trình thực thi:

- .exec() giúp phân biệt giai đoạn xây dựng query và thực thi query, điều này giúp code dễ bảo trì hơn, đặc biệt khi query có nhiều bước.
  Hỗ trợ tốt hơn cho chaining (xâu chuỗi):

- Bạn có thể áp dụng nhiều phương thức để tùy chỉnh query (như .sort(), .limit()), và chỉ thực thi nó sau khi hoàn tất việc xây dựng.

- trả về lỗi của nestjs hỗ trợ
  BadRequestException 400 Yêu cầu không hợp lệ
  UnauthorizedException 401 Không có quyền truy cập
  ForbiddenException 403 Bị cấm truy cập
  NotFoundException 404 Không tìm thấy tài nguyên
  ConflictException 409 Xung đột dữ liệu
  InternalServerErrorException 500 Lỗi máy chủ nội bộ
