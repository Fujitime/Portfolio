import slugify from 'slugify';

// Custom options for slugify (if needed)
const options = {
  lower: true,  // Convert to lowercase
  strict: true, // Strip special characters
};

// Export the slugify function as part of the composables
export const useSlugify = () => {
  const customSlugify = (text) => slugify(text, options);
  return { customSlugify };
};
