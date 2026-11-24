import tagsData from '../../../docs/eleven-labs/tags-eleven-labs-v4.json' with { type: 'json' };

export interface ElevenLabsV4TagGroup {
  key: keyof typeof tagsData.categories;
  label: string;
  tags: readonly string[];
}

export const ELEVENLABS_V4_STABILITY_PERCENT = 60;

export const ELEVENLABS_V4_ALL_TAGS: readonly string[] = tagsData.all_tags;

export const ELEVENLABS_V4_TAG_FORMAT: string = tagsData.format;

export const ELEVENLABS_V4_TAG_GROUPS: readonly ElevenLabsV4TagGroup[] = [
  {
    key: 'emotion',
    label: 'Emotion',
    tags: tagsData.categories.emotion,
  },
  {
    key: 'delivery',
    label: 'Delivery',
    tags: tagsData.categories.delivery,
  },
  {
    key: 'vocalizations',
    label: 'Vocalizations',
    tags: tagsData.categories.vocalizations,
  },
  {
    key: 'character',
    label: 'Character',
    tags: tagsData.categories.character,
  },
  {
    key: 'sound_effects',
    label: 'Sound Effects',
    tags: tagsData.categories.sound_effects,
  },
];
