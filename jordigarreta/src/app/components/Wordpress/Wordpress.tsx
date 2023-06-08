export const getPosts = async () => {
    try {
      const response = await fetch('https://dashboard.jordigarreta.com/wp-json/wp/v2/posts');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      return null;
    }
};