# Islam page (`/[locale]/islam`) — sources, method and open review items

Religious content lives in `lib/islam/*` (Arabic text, citations, counts). UI wording lives in `messages/*.json` under `islam`.
**No religious text is translated**: Arabic texts and citations are shown as-is in every interface language.

## Adhkar (morning / evening)
- **Text source:** «حصن المسلم» (سعيد بن علي بن وهف القحطاني), chapters «أذكار الصباح والمساء» and «أذكار المساء».
  Morning text comes from the open dataset `rn0x/Adhkar-json`; **every non-Qur'anic morning text (21 items) was then compared
  word-by-word (diacritics stripped) with a second transcription of the book (surahquran.com) — 20 identical, 1 orthographic
  variant** («السموات» in our data vs «السماوات» in the second source; same word).
- **Formatting-only changes:** removed the source's outer `(( ))`, the trailing count notes such as «(ثلاث مرات)»
  (the counter replaces them) and the `*` verse-end markers; the basmala in the sūra entry was fully vocalised.
- **Counts:** from the text of each entry. The dataset's `count` field was **wrong for «حسبي الله لا إله إلا هو…»** (1 instead of 7,
  while the entry's own text says seven times) — corrected to 7.
- **Periods:** entries restricted by their own text (`إذا أصبح` → morning only; `إذا أمسى` → evening only) appear in that period only:
  #19, #20, #21 (morning), #23 (evening).
- **Evening wording:** complete and **verbatim from the book's «أذكار المساء» chapter** for every item that changes (#3, #4, #6, #7, #15, #16, #23).
  Nothing is reconstructed.
- **References and gradings:** all 24 entries now carry the references printed in the book's footnotes (hadith numbers per the book),
  and a `grading` line only where the footnote itself states one (e.g. «حسّن ابن باز إسناده»). Several were cross-checked earlier against
  dorar.net / sunnah.com (Muslim 2723, 2692; al-Tirmidhī 3391, 3575; Abū Dāwūd 5082, 5081, 5074, 5091…).
- **Method limits (please read):** the references were transcribed from a website reproducing the book, not from a printed edition,
  and numbering differs between editions of Abū Dāwūd/Aḥmad/Ibn Mājah. Final approval remains with a qualified scholar.

### Items still deserving particular attention
- #24 (ṣalāt on the Prophet ×10): the book cites al-Ṭabarānī «بإسنادين أحدهما جيد»; scholars differ on the grading
  (kept as `gradeDisputed: true`, the UI says so).
- #1 (Āyat al-Kursī): the hadith reference given is al-Ḥākim (1/562) with attribution to al-Nasā'ī and al-Ṭabarānī, with al-Albānī's grading;
  the Qur'anic verse itself is cited by reference.
- #9 (ḥasbiya Allāh ×7): the book says Ibn al-Sunnī narrates it marfū‘ and Abū Dāwūd mawqūf; the UI shows both.

## Pillars of Islam
Names and the five Qur'anic references (47:19, 2:43, 9:60, 2:183, 3:97) are cited by reference only (no Qur'anic text
typed by hand). Hadith of the five pillars: Bukhārī 8 / Muslim 16 (cited by reference; wording and order differ slightly
between narrations). Explanations are short, general statements written for this site: **review recommended**.

## Pillars of Salah
Classification follows the **Hanbali school** (14 pillars, 8 obligatory acts) as in:
- «دليل الطالب» (مرعي بن يوسف الكرمي) — summarised at islamqa.info/ar/65847
- «رسالة في شروط الصلاة وأركانها وواجباتها» — محمد بن عبد الوهاب
The UI states clearly that the schools differ (Maliki, Hanafi and Shafi'i count differently). Sunan shown are examples taken
from the same source list, not exhaustive. Short explanations were written for this site: **review recommended**,
especially for users following the Maliki school (common in Morocco).

## Hero hadith (home page)
Full text of Jāmi' al-Tirmidhī 2516 (narrated by Ibn 'Abbās), checked against the vocalised wording in al-Mawsū'a al-Ḥadīthiyya (dorar.net, "اللفظ للترمذي") and the Tirmidhī text edited by Aḥmad Shākir. Known wording variant between editions: «وإنِ اجتمعوا» (used) / «ولو اجتمعوا».
