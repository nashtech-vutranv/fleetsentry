### GenericCode
```
    await this.genericCodeService.findOneByCondition({
      company_code: auth.company_code,
      language: LocaleEnum.English,
      key_type: GenericCodeKey.InspectionItemsCategory,
      key_value: category,
    });
    + GenericCodeService: Do GenericCodeModule đã setup là global 
    -> Nên khi sử dụng chỉ cần inject vào hàm contructor, Không cần import vào Module đang cần implement.
    
    - company_code : sẽ lấy thông tin từ auth.
    - language: sẽ sử dụng decorator để lấy thông tin về locale 
    - key_type: Dựa vào logic để xác định key: ( Cần đc định nghĩa ở GenericCodeKey enums : src/enums/generic-code.ts)
    - key_value: Sử dụng value tương ứng do client gửi lên.
    - Notes: Nếu chưa xác định đc key text: thì vẫn khai báo ở genericCodeKey enum
        GenericCodeKey_abc = "faker" // đây là key faker để mock dữ liệu
        Khi sư dụng faker key này cần add comment // TODO::
```