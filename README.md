# SARI Shop

Figma의 Frame 9(원석 단주)와 Frame 6(행운의 두 줄 단주)을 바탕으로 새로 설계한 모바일 우선 반응형 쇼핑몰입니다.

## 실행

```bash
npm install
npm run dev
```

## 상품 추가하기

1. GitHub에서 `assets/products/`에 상품 사진을 올립니다. 영문 파일명을 권장합니다.
2. 루트의 `catalog.json`에서 기존 상품 한 줄을 복사합니다.
3. `id`, `code`, `name`, `price`, `category`, `image`를 바꿉니다.
4. `main` 브랜치에 저장하면 GitHub Pages가 자동으로 다시 배포됩니다.

`public/catalog.json`과 `public/assets/products/`는 개발용 원본입니다. 코드 전체를 다시 빌드할 때는 같은 변경을 이 폴더에도 반영합니다.

카테고리 값은 다음 중 하나를 사용합니다.

- `stone`: 원석 단주
- `double`: 행운의 두 줄 단주
- `silver`: 은장식 단주
- `mala`: 108염주

## 주문 방식

현재는 서버 비용이 들지 않는 문의형 주문 방식입니다. 고객이 장바구니의 `주문 목록 공유하기`를 누르면 상품명, 수량, 합계가 휴대폰 공유창으로 전달됩니다. 이후 사업자 결제 수단이나 카카오톡 채널 주소가 정해지면 해당 버튼에 연결할 수 있습니다.

## 무료 배포

저장소 설정의 `Settings → Pages → Source`를 `GitHub Actions`로 선택합니다. 이후 `main`에 변경사항을 올릴 때마다 `.github/workflows/pages.yml`이 자동으로 빌드하고 배포합니다.
