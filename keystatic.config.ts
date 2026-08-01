import { config, collection, singleton, fields, type GitHubConfig, type LocalConfig } from "@keystatic/core"

const isProd = process.env.NODE_ENV === "production"

const localMode: LocalConfig["storage"] = {
  kind: "local",
}

const remoteMode: GitHubConfig["storage"] = {
  kind: "github",
  repo: "edle-pferde/edle-pferde",
}

export default config({
  storage: isProd ? remoteMode : localMode,
  collections: {
    articles: collection({
      columns: ["created_at"],
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        created_at: fields.date({
          label: "Created at",
          defaultValue: new Date().toISOString().split("T")[0],
          validation: {
            isRequired: true,
          },
        }),
        cover_image: fields.image({
          label: "Cover image",
          directory: "/src/assets/cover_images/articles/",
          publicPath: "/src/assets/cover_images/articles/",
          validation: {
            isRequired: true,
          },
        }),
        cover_image_crop_position: fields.select({
          label: "Cover image crop position",
          options: [
            { label: "top-left", value: "top-left" },
            { label: "top", value: "top" },
            { label: "top-right", value: "top-right" },
            { label: "left", value: "left" },
            { label: "center", value: "center" },
            { label: "right", value: "right" },
            { label: "bottom-left", value: "bottom-left" },
            { label: "bottom", value: "bottom" },
            { label: "bottom-right", value: "bottom-right" },
          ],
          defaultValue: "center",
        }),
        gallery: fields.array(
          fields.image({
            label: "Image for gallery",
            directory: "/src/assets/gallery/articles",
            publicPath: "/src/assets/gallery/articles/",
          }),
          {
            label: "Gallery",
          },
        ),
        horses: fields.array(
          fields.relationship({
            label: "Select a horse in this article",
            collection: "horses",
          }),
          {
            label: "Horses in this article",
            // @ts-ignore
            itemLabel: (props) => props.value,
          },
        ),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/articles/",
              publicPath: "../../assets/images/articles/",
            },
          },
        }),
      },
    }),
    horses: collection({
      columns: ["full_name", "birth_year", "lived_until", "status"],
      label: "Horses",
      slugField: "full_name",
      path: "src/content/horses/*",
      format: { contentField: "achievements" },
      schema: {
        full_name: fields.slug({ name: { label: "Full name" } }),
        family: fields.text({ label: "Family" }),
        current_owner: fields.text({ label: "Current owner" }),
        gender: fields.select({
          label: "Gender",
          options: [
            { label: "Hengst", value: "Hengst" },
            { label: "Wallach", value: "Wallach" },
            { label: "Stute", value: "Stute" },
          ],
          defaultValue: "Hengst",
        }),
        profile_picture: fields.image({
          label: "Profile picture",
          directory: "/src/assets/profile_pictures/horses",
          publicPath: "/src/assets/profile_pictures/horses/",
          validation: {
            isRequired: true,
          },
        }),
        profile_picture_crop_position: fields.select({
          label: "Profile picture crop position",
          options: [
            { label: "top-left", value: "top-left" },
            { label: "top", value: "top" },
            { label: "top-right", value: "top-right" },
            { label: "left", value: "left" },
            { label: "center", value: "center" },
            { label: "right", value: "right" },
            { label: "bottom-left", value: "bottom-left" },
            { label: "bottom", value: "bottom" },
            { label: "bottom-right", value: "bottom-right" },
          ],
          defaultValue: "center",
        }),
        profile_picture_alt_text: fields.text({
          label: "Profile picture / Alt text",
        }),
        gallery: fields.array(
          fields.image({
            label: "Image for gallery",
            directory: "/src/assets/gallery/horses",
            publicPath: "/src/assets/gallery/horses/",
          }),
          {
            label: "Gallery",
          },
        ),
        youtube_video_id: fields.text({
          label: "Youtube Video ID",
          description: 'e.g. only the "aqz-KE-bpKQ" from https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "For sale", value: "for-sale" },
          ],
          defaultValue: "active",
        }),
        birth_year: fields.text({
          label: "Birth year",
        }),
        lived_until: fields.text({
          label: "Lived until",
        }),
        in_stable_until: fields.text({
          label: "In stable until",
        }),
        breed: fields.text({ label: "Breed" }),
        size: fields.text({ label: "Size" }),
        color: fields.text({ label: "Color" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        achievements: fields.mdx({
          label: "Achievements",
          options: {
            image: {
              directory: "src/assets/images/horses",
              publicPath: "../../assets/images/horses/",
            },
          },
        }),
        father: fields.conditional(fields.checkbox({ label: "Is the father our horse?" }), {
          true: fields.relationship({
            label: "Father",
            collection: "horses",
          }),
          false: fields.text({
            label: "Father",
          }),
        }),
        mother: fields.conditional(fields.checkbox({ label: "Is the mother our horse?" }), {
          true: fields.relationship({
            label: "Mother",
            collection: "horses",
          }),
          false: fields.text({
            label: "Mother",
          }),
        }),
        fathers_father: fields.conditional(fields.checkbox({ label: "Is the father's father our horse?" }), {
          true: fields.relationship({
            label: "Father's father",
            collection: "horses",
          }),
          false: fields.text({
            label: "Father's father",
          }),
        }),
        fathers_mother: fields.conditional(fields.checkbox({ label: "Is the father's mother our horse?" }), {
          true: fields.relationship({
            label: "Father's mother",
            collection: "horses",
          }),
          false: fields.text({
            label: "Father's mother",
          }),
        }),
        mothers_father: fields.conditional(fields.checkbox({ label: "Is the mother's father our horse?" }), {
          true: fields.relationship({
            label: "Mother's father",
            collection: "horses",
          }),
          false: fields.text({
            label: "Mother's father",
          }),
        }),
        mothers_mother: fields.conditional(fields.checkbox({ label: "Is the mother's mother our horse?" }), {
          true: fields.relationship({
            label: "Mother's mother",
            collection: "horses",
          }),
          false: fields.text({
            label: "Mother's mother",
          }),
        }),
      },
    }),
    pages: collection({
      columns: ["title"],
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.mdx({
          label: "Content",
        }),
        gallery: fields.array(
          fields.image({
            label: "Image for gallery",
            directory: "/src/assets/gallery/pages",
            publicPath: "/src/assets/gallery/pages/",
          }),
          {
            label: "Gallery",
          },
        ),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "src/content/texts",
      schema: {
        about_text: fields.text({
          label: "About text",
          multiline: true,
        }),
        horses_headline: fields.text({
          label: "Horses headline",
        }),
        horses_description: fields.text({
          label: "Horses description",
          multiline: true,
        }),
        about_headline: fields.text({
          label: "About headline",
        }),
        about_description: fields.text({
          label: "About description",
          multiline: true,
        }),
        gallery_headline: fields.text({
          label: "Gallery headline",
        }),
        gallery_description: fields.text({
          label: "Gallery description",
          multiline: true,
        }),
        footer: fields.text({
          label: "Footer",
          multiline: true,
        }),
      },
    }),
    social_media: singleton({
      label: "Social media",
      path: "src/content/social_media",
      format: { data: "json" },
      schema: {
        facebook: fields.text({
          label: "Facebook",
          description: "The Facebook handle (not full URL!)",
        }),
        instagram: fields.text({
          label: "Instagram",
          description: "The Instagram username (not full URL!)",
        }),
        youtube: fields.text({
          label: "YouTube",
          description: "The YouTube channel username (not full URL!)",
        }),
      },
    }),
    contact: singleton({
      label: "Contact",
      path: "src/content/contact",
      format: { data: "json" },
      schema: {
        address: fields.text({
          label: "Address",
          multiline: true,
        }),
        email_address: fields.text({
          label: "Email address",
        }),
        phone_number: fields.text({
          label: "Phone number",
        }),
      },
    }),
  },
})
