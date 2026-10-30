# 🌐 GME FX & Remittance Competitor Intelligence Dashboard
> **글로벌 해외송금 경쟁사 실시간 환율 및 수취액 모니터링 분석 터미널**  
> *Global Money Express (GME) 실무 프로젝트*

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Styled-Components](https://img.shields.io/badge/Styled--Components-6.1.8-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.2-FF6384?style=flat-square&logo=chart.js&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-React--Intl-0052CC?style=flat-square)

---

## 📌 1. 프로젝트 개요 (Overview)

본 프로젝트는 대한민국 소액해외송금 선도 기업 **GME (Global Money Express)** 에서 운용된 **경쟁사 환율 및 송금 수취액 실시간 인텔리전스 시스템**의 프론트엔드 대시보드입니다.

해외송금 비즈니스는 송금 수수료와 환율 마진(Spread)에 따른 **최종 수취 금액(Payout Amount)** 이 고객 유치와 시장 점유율에 결정적인 영향을 미칩니다. 본 시스템은 주요 경쟁사들의 데이터를 실시간으로 스크래핑/수집하여, 외환 운용팀 및 비즈니스 의사결정권자가 자사(GME)의 가격 경쟁력을 한눈에 파악하고 즉각적인 환율 대응 정책을 펼칠 수 있도록 지원합니다.

---

## 💼 2. 비즈니스 도메인 및 모니터링 대상

- **송금 대상 국가 (Corridors)**: 네팔(NPR), 베트남(VND), 필리핀(PHP), 캄보디아(USD), 인도네시아(IDR), 태국(THB), 몽골(MNT) 등 총 20여 개 주요 송금국
- **송금 방식 (Remittance Methods)**:
  - `BDP01`: 은행 계좌 직접 입금 (Bank Deposit)
  - `BPM01`: 현지 제휴처 캐시 픽업 (Cash Pickup)
- **주요 모니터링 경쟁사**:
  - **GME** (자사)
  - **Hanpass** (한패스)
  - **GMoneyTrans** (지머니트랜스)
  - **Coinshot** (코인샷)
  - **JRF Korea** (제이알에프)
  - **E9Pay** (E9페이)
  - **Moin** (모인)
  - **Cross** (크로스 / SBIS)

---

## 🚀 3. 핵심 기능 (Key Features)

### 📈 1. 실시간 모니터링 (Live Feed Monitor)
- **60초 자동 갱신 인터벌**: 60초 카운트다운 타이머와 부드러운 프로그레스 바를 통해 최신 스크래핑 데이터 실시간 반영
- **인터벌 제어 컨트롤러**: 모니터링 일시정지(`Pause`), 재개(`Play`), 즉시 동기화(`Sync Now`) 기능 제공
- **연결 상태 안내 배너**: 백엔드 API와의 실시간 연결 상태 표시 및 네트워크 단절 시 시뮬레이션 데모 데이터 자동 전환(Graceful Fallback)

### 💎 2. 금융 KPI 메트릭 바 (Financial KPI Metrics)
- **🏆 시장 최고 수취액 (Top Market Offer)**: 전체 경쟁사 중 현지 수취액이 가장 높은 1위 업체명 및 금액
- **🎯 GME 시장 순위 (GME Position)**: 자사의 실시간 시장 순위 배지 (`Rank #2 of 8개사`) 및 자사 수취액
- **📊 시장 평균 수취액 (Market Average)**: 기준 송금액(100,000 KRW) 대비 전체 시장의 평균 수취 금액
- **⚡ GME 가격 우위도 (Advantage %)**: 시장 평균 대비 자사의 스프레드 차액 및 유리/불리 백분율(`+2.8%`, `-0.4%`)

### 📊 3. 경쟁사 랭킹 테이블 & 분석 (Rate Ranking Table)
- **순위 배지 (Rank Badge)**: 수취 금액 기준 1위(골드), 2위(실버), 3위(브론즈) 자동 부여
- **자사 서비스 강조**: GME 데이터 행에 전용 하이라이트(`[자사 서비스]`) 및 베이스 라인 기준 표기
- **스프레드 분석 (Spread vs GME)**: 자사 대비 각 경쟁사가 얼마나 더/덜 지급하는지 실시간 차액과 퍼센트(`+7,000 (+6.8%)`) 산출
- **실시간 검색 필터**: 모니터링 업체명 인라인 즉시 검색
- **금융 데이터 CSV 내보내기**: 화면에 집계된 환율 및 수취 데이터를 원클릭으로 `.csv` 파일 저장

### 📉 4. 시계열 통계 분석 (Historical Trend Analytics)
- **다기간 트렌드 분석**: 1일(24H), 1주일, 1개월, 1년 단위 기간 필터
- **시계열 멀티 라인 차트**: 복합 시계열 데이터 상에서 자사(GME)의 변동 곡선을 강조하고 경쟁사별 추이 시각화
- **구간 핵심 통계 카드**: 조회 구간 내 최고점(Peak), 최저점(Trough), 변동폭(Volatility Spread) 요약
- **수치 요약 데이터 테이블**: 각 업체별 최근값, 평균값, 최고/최저 수취액 집계표 제공

### 🌍 5. 글로벌 다국어 지원 (i18n)
- `react-intl` 기반 한국어 / 영어 실시간 전환 기능
- 현지 주재원 및 글로벌 파트너사 대응을 위한 영문 금융 터미널 UI 지원

---

## 🛠 4. 기술 스택 (Tech Stack)

| 분류 | 기술 | 선정 이유 |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18.2 (TypeScript)** | 안정적인 컴포넌트 생명주기 및 타입 안전성을 바탕으로 대량의 금융 데이터 핸들링 |
| **Styling** | **Styled-Components, Polished** | 금융 블룸버그 터미널 스타일의 일관된 다크 디자인 시스템 및 반응형 레이아웃 구현 |
| **Data Visualization** | **Chart.js 4.4, React-Chartjs-2** | 캔버스 기반 고성능 렌더링, 시계열 라인 및 막대 그래프의 유연한 커스터마이징 |
| **Network & API** | **Axios, Http-Proxy-Middleware** | RESTful API 통신 및 사내망/로컬 개발 환경 CORS 우회 프록시 연동 |
| **Date & Currency** | **Moment.js, Date-fns** | 시계열 데이터 포맷팅 및 금융 통화 포맷터 유틸리티 |
| **Internationalization** | **React-Intl** | 글로벌 외환 서비스에 필수적인 다국어(한국어/영어) 지원 |
| **Icons** | **React-Icons (Feather, FontAwesome)** | 직관적인 금융 대시보드 지표 및 인터랙션 아이콘 |

---

## 📂 5. 프로젝트 디렉토리 구조 (Project Structure)

```bash
src/
├── api/                   # REST API 클라이언트 및 엔드포인트 정의
│   ├── HistoricalView/    # 시계열 통계 데이터 API 호출부
│   └── LiveView/          # 실시간 모니터링 데이터 API 호출부
├── assets/                # GME 공식 로고 및 국가별 플래그 이미지
├── components/            # 재사용 가능한 UI 컴포넌트
│   ├── BarChart.tsx       # 경쟁사별 수취액 비교 막대 차트
│   ├── LineChart.tsx      # 시계열 환율 변동 라인 차트
│   ├── DataTable.tsx      # 실시간 경쟁사 랭킹 및 스프레드 분석 테이블
│   ├── FinancialMetrics.tsx# 금융 KPI 지표 카드 (최고액, GME 순위, 평균, 타이머)
│   ├── Header.tsx         # 엔터프라이즈 브랜드 헤더
│   ├── TabMenu.tsx        # 최상단 세그먼트 탭 네비게이션 & FX 티커
│   ├── ToggleButton.tsx   # 다국어(KO/ENG) 선택 드롭다운
│   ├── Dropdown.tsx       # 국가 및 송금 코드 선택 셀렉트 박스
│   ├── DateInput.tsx      # 수집 시각 표시 컴포넌트
│   └── Loading.tsx        # 금융 데이터 로딩 스피너
├── contents/              # 주요 화면 뷰 (Page Views)
│   ├── LiveView/          # [1] 실시간 경쟁사 모니터링 화면
│   └── HistoricalView/    # [2] 시계열 환율 통계 화면
├── dummy/                 # 사내망 외부/API 미연결 시 자동 동작하는 시뮬레이션 데이터
├── enum/                  # 국가(Country), 송금 방식(RemitMethod), URL 매핑 상수
├── function/              # 숫자 통화 포맷터(currencyFormatter) 유틸
├── lang/                  # 다국어 번역 리소스 (kor.json, eng.json)
└── models/                # TypeScript Interface & Type Definitions
```

---

## 💡 6. 실무 문제 해결 및 엔지니어링 포인트

1. **차트 인스턴스 생명주기 관리 및 메모리 누수 방지**
   - 60초마다 반복되는 데이터 폴링 환경에서 Chart.js 인스턴스가 중복 생성되어 브라우저 메모리가 누수되거나 차트가 깜빡이는 현상을 해결하기 위해 `useRef`를 통한 인스턴스 캐싱 및 컴포넌트 언마운트 시 명시적 `destroy()` 파괴 라이프사이클을 확립했습니다.
2. **사내 폐쇄망 환경을 고려한 Graceful Degradation (우아한 폴백) 아키텍처**
   - 실제 사내망 백엔드 서버(`172.25.12.91`) 연결이 불가능한 외부 환경이나 포트폴리오 시연 시에도 서비스가 멈추지 않고 준비된 시뮬레이션 데이터를 유기적으로 전환하여 동일한 사용자 경험을 제공하도록 예외 처리 파이프라인을 구축했습니다.
3. **복잡한 다자간 외환 지표의 시각화 단순화**
   - 송금국-수취국 간 다양한 통화 단위와 업체별 수수료 체계를 '기준 송금액(100,000 KRW) 대비 수취액'이라는 단일 기준으로 정규화하고, 자사(GME)와의 스프레드를 실시간으로 계산하여 비즈니스 부서에서 즉각적인 경쟁 우위를 판단할 수 있도록 설계했습니다.

---

## 💻 7. 실행 방법 (Getting Started)

### 설치 (Installation)
```bash
npm install
```

### 환경 변수 설정 (`.env`)
```env
REACT_APP_SERVICE_URL = "http://172.25.12.91:8081"
```

### 로컬 개발 서버 실행 (Development)
```bash
npm start
```
브라우저에서 `http://localhost:3000` 접속 시 대시보드를 확인하실 수 있습니다.

### 프로덕션 빌드 (Production Build)
```bash
npm run build
```

---

© Global Money Express Co., Ltd. All Rights Reserved.
