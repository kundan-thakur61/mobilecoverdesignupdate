const fs = require('fs');
const filePath = './index.html';
let content = fs.readFileSync(filePath, 'utf8');
// Fix: remove the duplicate corrupted script closing
// Pattern: </script>etails."}}]}]</script>  =>  </script>
content = content.replace(/<\/script>etails[^<]*<\/script>/g, '</script>');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed index.html');
