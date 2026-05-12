# 1119wj.github.io — 에이전트 가이드

## 새 글을 추가할 때 (필수 규칙)

새 포스트를 `content/posts/YYYY-MM-DD-<slug>.mdx`로 만들 때, frontmatter는 다음 필드를 **모두** 포함해야 한다. 하나라도 누락되면 `loadPosts()`가 throw하고 빌드가 깨진다.

```yaml
---
title: <글 제목>
date: YYYY-MM-DD
description: <한두 문장 요약>
category: <카테고리 라벨>     # ⚠️ 필수. 빠지면 빌드 실패.
accent: spice | aqua | lavender | yellow | blue
---
```

### `category` 필드

- 절대로 비워두지 않는다. 비어 있으면 `loadPosts()`가 의도적으로 throw한다 (`lib/posts.ts`).
- 짧은 한국어 라벨을 권장한다 (예: `디버깅`, `리팩토링`, `회고`, `아키텍처`, `러닝`).
- 카드/상세 페이지에서 날짜 왼쪽의 pill 뱃지로 렌더링된다. 뱃지 배경색은 `accent` 색을 그대로 사용한다.
- 기존 글에 쓰인 라벨과 의미가 겹치면 같은 라벨을 재사용해서 카테고리 수가 폭발하지 않도록 한다. 현재 사용 중인 라벨은 `content/posts/*.mdx` frontmatter에서 확인할 수 있다.

### 글 배포 워크플로 체크리스트

1. mdx 파일을 위 형식으로 작성한다 (`category` 잊지 말 것).
2. `pnpm typecheck` 와 `pnpm test` 가 통과하는지 확인.
3. `pnpm build` 로 정적 출력이 실제로 빌드되는지 확인 (카테고리 누락이 여기서도 잡힌다).
4. 커밋 → 푸시.

## 패키지 매니저

이 저장소는 **단일 패키지**다. 모노레포가 아니다. `pnpm-lock.yaml`만 있고 `pnpm-workspace.yaml`은 없다. pnpm을 쓰는 이유는 디스크 효율(content-addressable store)과 install 속도 때문이며, 그 외 특별한 이유는 없다. npm/yarn 대신 pnpm을 일관되게 사용한다.

## 디자인 시스템 메모

- 색상/스페이싱/타이포는 `app/globals.css`의 `@theme` 블록과 유틸리티에 정의되어 있다. 새 컴포넌트도 가능한 한 거기 정의된 토큰(`--color-*`, `--space-*`, `.text-body*`, `.badge`, `.card-lift` 등)을 재사용한다.
- 포스트 카드/상세에서 색상 강조는 `accent` 한 곳에서만 결정된다 — 뱃지 배경이 곧 그 색이다. 별도의 카테고리별 색 매핑을 도입하지 않는다.
