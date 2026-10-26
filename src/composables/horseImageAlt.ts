// Alt text for a horse's profile picture. CMS alt texts that are only the horse's
// name or slug fall back to a generated description.
export function horseImageAlt(data: {
  full_name: string;
  breed?: string;
  gender?: string;
  profile_picture_alt_text?: string | null;
}): string {
  const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9äöüß]/g, '');
  const custom = data.profile_picture_alt_text?.trim();
  if (custom && custom.includes(' ') && normalize(custom) !== normalize(data.full_name)) return custom;
  return [data.full_name, [data.breed, data.gender].filter(Boolean).join(' ')].filter(Boolean).join(', ');
}
