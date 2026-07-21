export const SITE_URL = "https://1119wj.github.io";

/**
 * giscus 댓글 설정 (https://giscus.app)
 *
 * categoryId가 비어 있으면 댓글 섹션은 렌더링되지 않는다.
 * 활성화 절차:
 *   1. 저장소 Discussions 켜기: gh api -X PATCH repos/1119wj/1119wj.github.io -f has_discussions=true
 *   2. giscus 앱 설치: https://github.com/apps/giscus
 *   3. https://giscus.app 에서 저장소 입력 후 생성된 data-category / data-category-id를 아래에 붙여넣기
 */
export const GISCUS = {
  repo: "1119wj/1119wj.github.io",
  repoId: "R_kgDOSaauUg",
  category: "Announcements",
  categoryId: "",
};
