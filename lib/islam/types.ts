export type Period = 'morning' | 'evening';

export interface Dhikr {
  id: number;
  /** Required repetitions (from the source text). */
  count: number;
  /** Times of day at which the source prescribes this dhikr. */
  periods: Period[];
  /** Arabic text as in the source (morning wording). */
  text: string;
  /** Complete evening wording, when the source gives one. */
  eveningText?: string;
  /** Source's abbreviated evening instructions, shown verbatim under the text. */
  eveningNotes?: string[];
  /** Extra note from the source, shown verbatim. */
  note?: string;
  /** Verified references (Arabic citation strings). Empty when not yet verified. */
  refs: string[];
  /** True when the takhrij/grading still needs scholarly review. */
  review: boolean;
  /** True when scholars differ on the grading of the hadith. */
  gradeDisputed?: boolean;
}
