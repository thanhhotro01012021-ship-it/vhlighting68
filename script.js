function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mobileMenu");
    if (menu) {
      menu.classList.remove("open");
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const zaloPhone = "0877933362";

const noiDungSanPham = {
  ray: `Tôi cần báo giá ĐÈN RAY NAM CHÂM 48V.
Shop tư vấn giúp tôi:
- Thanh ray âm/nổi
- Đèn spotlight/floodlight/linear
- Nguồn 48V
- Phụ kiện đi kèm
Tôi muốn nhận báo giá tốt nhất.`,

  amtran: `Tôi cần báo giá ĐÈN ÂM TRẦN / ĐÈN PANEL.
Shop tư vấn giúp tôi:
- Công suất phù hợp
- Ánh sáng trắng/vàng/trung tính
- Giá sỉ/lẻ
Tôi muốn nhận báo giá tốt nhất.`,

  ledthanh: `Tôi cần báo giá LED THANH NHÔM NỘI THẤT.
Shop tư vấn giúp tôi:
- Led thanh nhôm tủ bếp/tủ áo/kệ
- Nguồn 12V/24V
- Phụ kiện lắp đặt
Tôi muốn nhận báo giá combo đủ bộ.`,

  nguonled: `Tôi cần báo giá NGUỒN LED 12V / 24V.
Shop tư vấn giúp tôi:
- Công suất nguồn phù hợp
- Nguồn trong nhà/ngoài trời
- Nguồn mỏng/nguồn tổ ong/nguồn đổ keo
Tôi muốn nhận báo giá tốt nhất.`,

  trangtri: `Tôi cần báo giá ĐÈN TRANG TRÍ.
Shop tư vấn giúp tôi:
- Đèn thả/đèn tường/đèn decor
- Mẫu phù hợp phòng khách, phòng ngủ, quán, showroom
Tôi muốn xem mẫu và nhận báo giá.`,

  phukien: `Tôi cần báo giá PHỤ KIỆN LED.
Shop tư vấn giúp tôi:
- Dây, jack nối, dimmer
- Công tắc, phụ kiện lắp đặt
- Phụ kiện cho thợ/công trình
Tôi muốn nhận báo giá.`,

  quattran: `Tôi cần báo giá QUẠT TRẦN.
Shop tư vấn giúp tôi:
- Quạt trần trang trí
- Quạt trần đèn
- Mẫu phù hợp phòng khách/phòng ngủ/showroom
Tôi muốn xem mẫu và nhận báo giá.`,

  dencotnha: `Tôi cần báo giá ĐÈN CỘT NHÀ.
Shop tư vấn giúp tôi:
- Đèn cột cổng / đèn trụ cổng
- Đèn sân vườn ngoài trời
- Mẫu phù hợp nhà phố, biệt thự, công trình
Tôi muốn xem mẫu và nhận báo giá.`,

  denphahat: `Tôi cần báo giá ĐÈN PHA HẮT.
Shop tư vấn giúp tôi:
- Đèn pha LED
- Đèn hắt tường / hắt cây / hắt mặt tiền
- Công suất phù hợp cho công trình
Tôi muốn nhận báo giá tốt nhất.`
};

function moZaloVoiNoiDung(noiDung) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(noiDung).catch(() => {});
  }

  const link = `https://zalo.me/${zaloPhone}?text=${encodeURIComponent(noiDung)}`;
  window.open(link, "_blank");
}

function baoGiaSanPham(maSanPham) {
  const noiDung = noiDungSanPham[maSanPham] || "Tôi cần nhận báo giá sản phẩm từ Vũ Lighting.";
  moZaloVoiNoiDung(noiDung);
}

function sendZalo(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const need = document.getElementById("need").value;
  const note = document.getElementById("note").value.trim();

  const msg =
`Tôi cần báo giá:
- Tên: ${name}
- SĐT: ${phone}
- Nhu cầu: ${need}
- Ghi chú: ${note || "Không có"}`;

  moZaloVoiNoiDung(msg);
}



/* ===== SLIDER ẢNH TỪNG SẢN PHẨM ===== */
function initProductSliders() {
  const sliders = document.querySelectorAll(".product-slider");

  sliders.forEach((slider, sliderIndex) => {
    let images = Array.from(slider.querySelectorAll("img"));
    let dots = Array.from(slider.querySelectorAll(".slider-dots span"));

    // Sau khi ảnh lỗi bị remove, cập nhật lại danh sách
    setTimeout(() => {
      images = Array.from(slider.querySelectorAll("img"));
      dots = Array.from(slider.querySelectorAll(".slider-dots span")).slice(0, images.length);

      const dotWrap = slider.querySelector(".slider-dots");
      if (dotWrap && images.length <= 1) {
        dotWrap.style.display = "none";
      }

      if (!images.length) return;

      images.forEach((img, index) => {
        img.classList.toggle("active", index === 0);
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === 0);
      });

      let current = 0;

      function showSlide(nextIndex) {
        if (!images.length) return;

        images[current].classList.remove("active");
        if (dots[current]) dots[current].classList.remove("active");

        current = nextIndex % images.length;

        images[current].classList.add("active");
        if (dots[current]) dots[current].classList.add("active");
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
      });

      // Mỗi card chạy lệch thời gian nhẹ để nhìn tự nhiên hơn
      const delay = 2800 + sliderIndex * 220;
      setInterval(() => {
        showSlide(current + 1);
      }, delay);
    }, 500);
  });
}

initProductSliders();
