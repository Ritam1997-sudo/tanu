
<!-- Schema Generator Tool -->
<div class="generator-tool">
    <div class="tool-header">
        <h2>🚀 Generate Schema Markup</h2>
        <p>Select schema type and fill in the fields</p>
    </div>
   
    <div class="tool-body">
        <div class="tool-left">
            <div class="form-group">
                <label for="schemaType">Select Schema Type</label>
                <select id="schemaType" class="form-control">
                    <option value="Organization">Organization Schema</option>
                    <option value="LocalBusiness">Local Business Schema</option>
                    <option value="Product">Product Schema</option>
                    <option value="Article">Article Schema</option>
                    <option value="FAQPage">FAQ Schema</option>
                    <option value="HowTo">How-To Schema</option>
                    <option value="Recipe">Recipe Schema</option>
                    <option value="Event">Event Schema</option>
                    <option value="Person">Person Schema</option>
                    <option value="Review">Review Schema</option>
                    <option value="VideoObject">Video Schema</option>
                    <option value="BreadcrumbList">Breadcrumb Schema</option>
                </select>
            </div>
            <div id="dynamicFields" class="dynamic-fields">
                <!-- Dynamic fields will be injected here -->
            </div>
            <!-- New Custom Properties Section -->
            <div class="custom-section" id="customSection" style="margin-top: 1rem; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 8px; background: #f9f9f9;">
                <h4>🔧 Additional Custom Properties</h4>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">Add any extra schema properties (e.g., "foundingDate": "2020-01-01") to extend your schema without restrictions.</p>
                <div id="customProps">
                    <!-- Custom properties will be dynamically added here -->
                </div>
                <button type="button" onclick="addCustomProp()" class="btn btn-secondary" style="margin-top: 0.5rem; width: 100%;">➕ Add Custom Property</button>
            </div>
            <div class="tool-actions">
                <button id="generateBtn" class="btn btn-primary">✨ Generate Schema</button>
                <button id="clearBtn" class="btn btn-secondary">🔄 Clear Form</button>
            </div>
        </div>
        <div class="tool-right">
            <div class="preview-header">
                <h3>📋 JSON-LD Preview</h3>
                <span id="validationStatus" class="validation-status"></span>
            </div>
            <pre id="schemaOutput" class="schema-output">// Your generated schema will appear here...</pre>
            <div class="output-actions">
                <button id="copyBtn" class="btn btn-success">📄 Copy to Clipboard</button>
                <button id="downloadBtn" class="btn btn-success">💾 Download JSON</button>
            </div>
        </div>
    </div>
</div>
```

```javascript
// Schema Markup Generator - Lightweight JavaScript
// Schema field definitions for each type
const schemaFields = {
    Organization: [
        { name: 'name', label: 'Organization Name *', type: 'text', required: true },
        { name: 'url', label: 'Website URL *', type: 'url', required: true },
        { name: 'logo', label: 'Logo URL', type: 'url', required: false },
        { name: 'description', label: 'Description', type: 'textarea', required: false },
        { name: 'telephone', label: 'Phone Number', type: 'tel', required: false },
        { name: 'email', label: 'Email', type: 'email', required: false },
        { name: 'address', label: 'Street Address', type: 'text', required: false },
        { name: 'city', label: 'City', type: 'text', required: false },
        { name: 'state', label: 'State/Region', type: 'text', required: false },
        { name: 'postalCode', label: 'Postal Code', type: 'text', required: false },
        { name: 'country', label: 'Country', type: 'text', required: false }
    ],
    LocalBusiness: [
        { name: 'name', label: 'Business Name *', type: 'text', required: true },
        { name: 'image', label: 'Business Image URL', type: 'url', required: false },
        { name: 'telephone', label: 'Phone Number *', type: 'tel', required: true },
        { name: 'address', label: 'Street Address *', type: 'text', required: true },
        { name: 'city', label: 'City *', type: 'text', required: true },
        { name: 'state', label: 'State/Region *', type: 'text', required: true },
        { name: 'postalCode', label: 'Postal Code *', type: 'text', required: true },
        { name: 'country', label: 'Country *', type: 'text', required: true },
        { name: 'priceRange', label: 'Price Range (e.g. $$)', type: 'text', required: false },
        { name: 'openingHours', label: 'Opening Hours (e.g. Mo-Fr 09:00-17:00)', type: 'text', required: false }
    ],
    Product: [
        { name: 'name', label: 'Product Name *', type: 'text', required: true },
        { name: 'image', label: 'Product Image URL *', type: 'url', required: true },
        { name: 'description', label: 'Product Description *', type: 'textarea', required: true },
        { name: 'brand', label: 'Brand Name', type: 'text', required: false },
        { name: 'sku', label: 'SKU', type: 'text', required: false },
        { name: 'price', label: 'Price *', type: 'number', required: true },
        { name: 'priceCurrency', label: 'Currency Code (e.g. USD) *', type: 'text', required: true },
        { name: 'availability', label: 'Availability (InStock/OutOfStock)', type: 'text', required: false },
        { name: 'ratingValue', label: 'Rating Value (1-5)', type: 'number', required: false },
        { name: 'reviewCount', label: 'Number of Reviews', type: 'number', required: false }
    ],
    Article: [
        { name: 'headline', label: 'Article Headline *', type: 'text', required: true },
        { name: 'image', label: 'Article Image URL *', type: 'url', required: true },
        { name: 'author', label: 'Author Name *', type: 'text', required: true },
        { name: 'publisher', label: 'Publisher Name *', type: 'text', required: true },
        { name: 'publisherLogo', label: 'Publisher Logo URL *', type: 'url', required: true },
        { name: 'datePublished', label: 'Published Date (YYYY-MM-DD) *', type: 'date', required: true },
        { name: 'dateModified', label: 'Modified Date (YYYY-MM-DD)', type: 'date', required: false },
        { name: 'description', label: 'Article Description', type: 'textarea', required: false }
    ],
    FAQPage: [
        { name: 'question1', label: 'Question 1 *', type: 'text', required: true },
        { name: 'answer1', label: 'Answer 1 *', type: 'textarea', required: true },
        { name: 'question2', label: 'Question 2', type: 'text', required: false },
        { name: 'answer2', label: 'Answer 2', type: 'textarea', required: false },
        { name: 'question3', label: 'Question 3', type: 'text', required: false },
        { name: 'answer3', label: 'Answer 3', type: 'textarea', required: false }
    ],
    HowTo: [
        { name: 'name', label: 'How-To Title *', type: 'text', required: true },
        { name: 'description', label: 'Description *', type: 'textarea', required: true },
        { name: 'image', label: 'Image URL', type: 'url', required: false },
        { name: 'totalTime', label: 'Total Time (e.g. PT1H30M)', type: 'text', required: false },
        { name: 'step1', label: 'Step 1 *', type: 'textarea', required: true },
        { name: 'step2', label: 'Step 2', type: 'textarea', required: false },
        { name: 'step3', label: 'Step 3', type: 'textarea', required: false }
    ],
    Recipe: [
        { name: 'name', label: 'Recipe Name *', type: 'text', required: true },
        { name: 'image', label: 'Recipe Image URL *', type: 'url', required: true },
        { name: 'author', label: 'Author Name *', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: false },
        { name: 'prepTime', label: 'Prep Time (e.g. PT30M)', type: 'text', required: false },
        { name: 'cookTime', label: 'Cook Time (e.g. PT1H)', type: 'text', required: false },
        { name: 'totalTime', label: 'Total Time (e.g. PT1H30M)', type: 'text', required: false },
        { name: 'recipeYield', label: 'Servings (e.g. 4 servings)', type: 'text', required: false },
        { name: 'calories', label: 'Calories', type: 'text', required: false }
    ],
    Event: [
        { name: 'name', label: 'Event Name *', type: 'text', required: true },
        { name: 'startDate', label: 'Start Date & Time (YYYY-MM-DDTHH:MM) *', type: 'datetime-local', required: true },
        { name: 'endDate', label: 'End Date & Time (YYYY-MM-DDTHH:MM)', type: 'datetime-local', required: false },
        { name: 'location', label: 'Location Name *', type: 'text', required: true },
        { name: 'address', label: 'Street Address', type: 'text', required: false },
        { name: 'city', label: 'City', type: 'text', required: false },
        { name: 'description', label: 'Event Description', type: 'textarea', required: false },
        { name: 'image', label: 'Event Image URL', type: 'url', required: false },
        { name: 'price', label: 'Ticket Price', type: 'number', required: false },
        { name: 'priceCurrency', label: 'Currency (e.g. USD)', type: 'text', required: false }
    ],
    Person: [
        { name: 'name', label: 'Full Name *', type: 'text', required: true },
        { name: 'jobTitle', label: 'Job Title', type: 'text', required: false },
        { name: 'image', label: 'Photo URL', type: 'url', required: false },
        { name: 'url', label: 'Website URL', type: 'url', required: false },
        { name: 'telephone', label: 'Phone Number', type: 'tel', required: false },
        { name: 'email', label: 'Email', type: 'email', required: false },
        { name: 'address', label: 'Street Address', type: 'text', required: false },
        { name: 'city', label: 'City', type: 'text', required: false },
        { name: 'description', label: 'Bio/Description', type: 'textarea', required: false }
    ],
    Review: [
        { name: 'itemReviewed', label: 'Item Reviewed (Name) *', type: 'text', required: true },
        { name: 'author', label: 'Reviewer Name *', type: 'text', required: true },
        { name: 'reviewRating', label: 'Rating (1-5) *', type: 'number', required: true },
        { name: 'reviewBody', label: 'Review Text *', type: 'textarea', required: true },
        { name: 'datePublished', label: 'Review Date (YYYY-MM-DD)', type: 'date', required: false }
    ],
    VideoObject: [
        { name: 'name', label: 'Video Title *', type: 'text', required: true },
        { name: 'description', label: 'Video Description *', type: 'textarea', required: true },
        { name: 'thumbnailUrl', label: 'Thumbnail URL *', type: 'url', required: true },
        { name: 'uploadDate', label: 'Upload Date (YYYY-MM-DD) *', type: 'date', required: true },
        { name: 'duration', label: 'Duration (e.g. PT1M33S)', type: 'text', required: false },
        { name: 'contentUrl', label: 'Video URL', type: 'url', required: false }
    ],
    BreadcrumbList: [
        { name: 'item1Name', label: 'Level 1 Name (e.g. Home) *', type: 'text', required: true },
        { name: 'item1Url', label: 'Level 1 URL *', type: 'url', required: true },
        { name: 'item2Name', label: 'Level 2 Name', type: 'text', required: false },
        { name: 'item2Url', label: 'Level 2 URL', type: 'url', required: false },
        { name: 'item3Name', label: 'Level 3 Name', type: 'text', required: false },
        { name: 'item3Url', label: 'Level 3 URL', type: 'url', required: false }
    ]
};
// Schema generators
const schemaGenerators = {
    Organization: (data) => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": data.name,
        "url": data.url,
        ...(data.logo && { "logo": data.logo }),
        ...(data.description && { "description": data.description }),
        ...(data.telephone && { "telephone": data.telephone }),
        ...(data.email && { "email": data.email }),
        ...((data.address || data.city) && {
            "address": {
                "@type": "PostalAddress",
                ...(data.address && { "streetAddress": data.address }),
                ...(data.city && { "addressLocality": data.city }),
                ...(data.state && { "addressRegion": data.state }),
                ...(data.postalCode && { "postalCode": data.postalCode }),
                ...(data.country && { "addressCountry": data.country })
            }
        })
    }),
    LocalBusiness: (data) => ({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": data.name,
        ...(data.image && { "image": data.image }),
        "telephone": data.telephone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address,
            "addressLocality": data.city,
            "addressRegion": data.state,
            "postalCode": data.postalCode,
            "addressCountry": data.country
        },
        ...(data.priceRange && { "priceRange": data.priceRange }),
        ...(data.openingHours && { "openingHours": data.openingHours })
    }),
    Product: (data) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "image": data.image,
        "description": data.description,
        ...(data.brand && { "brand": { "@type": "Brand", "name": data.brand } }),
        ...(data.sku && { "sku": data.sku }),
        "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": data.priceCurrency,
            ...(data.availability && { "availability": `https://schema.org/${data.availability}` }),
            "url": window.location.href
        },
        ...((data.ratingValue && data.reviewCount) && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": data.ratingValue,
                "reviewCount": data.reviewCount
            }
        })
    }),
    Article: (data) => ({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.headline,
        "image": data.image,
        "author": {
            "@type": "Person",
            "name": data.author
        },
        "publisher": {
            "@type": "Organization",
            "name": data.publisher,
            "logo": {
                "@type": "ImageObject",
                "url": data.publisherLogo
            }
        },
        "datePublished": data.datePublished,
        ...(data.dateModified && { "dateModified": data.dateModified }),
        ...(data.description && { "description": data.description })
    }),
    FAQPage: (data) => {
        const mainEntity = [];
        for (let i = 1; i <= 3; i++) {
            if (data[`question${i}`] && data[`answer${i}`]) {
                mainEntity.push({
                    "@type": "Question",
                    "name": data[`question${i}`],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": data[`answer${i}`]
                    }
                });
            }
        }
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": mainEntity
        };
    },
    HowTo: (data) => {
        const steps = [];
        for (let i = 1; i <= 3; i++) {
            if (data[`step${i}`]) {
                steps.push({
                    "@type": "HowToStep",
                    "text": data[`step${i}`]
                });
            }
        }
        return {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": data.name,
            "description": data.description,
            ...(data.image && { "image": data.image }),
            ...(data.totalTime && { "totalTime": data.totalTime }),
            "step": steps
        };
    },
    Recipe: (data) => ({
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": data.name,
        "image": data.image,
        "author": {
            "@type": "Person",
            "name": data.author
        },
        ...(data.description && { "description": data.description }),
        ...(data.prepTime && { "prepTime": data.prepTime }),
        ...(data.cookTime && { "cookTime": data.cookTime }),
        ...(data.totalTime && { "totalTime": data.totalTime }),
        ...(data.recipeYield && { "recipeYield": data.recipeYield }),
        ...(data.calories && {
            "nutrition": {
                "@type": "NutritionInformation",
                "calories": data.calories
            }
        })
    }),
    Event: (data) => ({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": data.name,
        "startDate": data.startDate,
        ...(data.endDate && { "endDate": data.endDate }),
        "location": {
            "@type": "Place",
            "name": data.location,
            ...((data.address || data.city) && {
                "address": {
                    "@type": "PostalAddress",
                    ...(data.address && { "streetAddress": data.address }),
                    ...(data.city && { "addressLocality": data.city })
                }
            })
        },
        ...(data.description && { "description": data.description }),
        ...(data.image && { "image": data.image }),
        ...((data.price && data.priceCurrency) && {
            "offers": {
                "@type": "Offer",
                "price": data.price,
                "priceCurrency": data.priceCurrency
            }
        })
    }),
    Person: (data) => ({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": data.name,
        ...(data.jobTitle && { "jobTitle": data.jobTitle }),
        ...(data.image && { "image": data.image }),
        ...(data.url && { "url": data.url }),
        ...(data.telephone && { "telephone": data.telephone }),
        ...(data.email && { "email": data.email }),
        ...((data.address || data.city) && {
            "address": {
                "@type": "PostalAddress",
                ...(data.address && { "streetAddress": data.address }),
                ...(data.city && { "addressLocality": data.city })
            }
        }),
        ...(data.description && { "description": data.description })
    }),
    Review: (data) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
            "@type": "Thing",
            "name": data.itemReviewed
        },
        "author": {
            "@type": "Person",
            "name": data.author
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.reviewRating,
            "bestRating": "5"
        },
        "reviewBody": data.reviewBody,
        ...(data.datePublished && { "datePublished": data.datePublished })
    }),
    VideoObject: (data) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": data.name,
        "description": data.description,
        "thumbnailUrl": data.thumbnailUrl,
        "uploadDate": data.uploadDate,
        ...(data.duration && { "duration": data.duration }),
        ...(data.contentUrl && { "contentUrl": data.contentUrl })
    }),
    BreadcrumbList: (data) => {
        const itemListElement = [];
        for (let i = 1; i <= 3; i++) {
            if (data[`item${i}Name`] && data[`item${i}Url`]) {
                itemListElement.push({
                    "@type": "ListItem",
                    "position": i,
                    "name": data[`item${i}Name`],
                    "item": data[`item${i}Url`]
                });
            }
        }
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        };
    }
};
// DOM elements
const schemaTypeSelect = document.getElementById('schemaType');
const dynamicFields = document.getElementById('dynamicFields');
const customSection = document.getElementById('customSection');
const customProps = document.getElementById('customProps');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const schemaOutput = document.getElementById('schemaOutput');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const validationStatus = document.getElementById('validationStatus');
// Current schema data
let currentSchema = null;
let customPropCount = 0;
// Render dynamic fields based on selected schema type
function renderFields() {
    const schemaType = schemaTypeSelect.value;
    const fields = schemaFields[schemaType];
   
    dynamicFields.innerHTML = '';
   
    fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
       
        const label = document.createElement('label');
        label.textContent = field.label;
        label.htmlFor = field.name;
       
        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 3;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
       
        input.id = field.name;
        input.name = field.name;
        input.className = 'form-control';
        input.required = field.required;
       
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        dynamicFields.appendChild(formGroup);
    });
   
    // Reset custom props on type change
    clearCustomProps();
}
// Add a custom property input pair
function addCustomProp() {
    customPropCount++;
    const propGroup = document.createElement('div');
    propGroup.className = 'custom-prop-group';
    propGroup.id = `customPropGroup${customPropCount}`;
    propGroup.style.marginBottom = '1rem';
    propGroup.style.padding = '0.5rem';
    propGroup.style.border = '1px dashed #ccc';
    propGroup.style.borderRadius = '4px';
    propGroup.style.display = 'flex';
    propGroup.style.gap = '0.5rem';
    propGroup.style.alignItems = 'end';
   
    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.placeholder = 'Property Name (e.g., foundingDate)';
    keyInput.className = 'form-control';
    keyInput.style.flex = '1';
    keyInput.id = `customKey${customPropCount}`;
    keyInput.name = `customKey${customPropCount}`;
   
    const valueInput = document.createElement('textarea');
    valueInput.rows = 2;
    valueInput.placeholder = 'Property Value (e.g., 2020-01-01)';
    valueInput.className = 'form-control';
    valueInput.style.flex = '2';
    valueInput.id = `customValue${customPropCount}`;
    valueInput.name = `customValue${customPropCount}`;
   
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '🗑️ Remove';
    removeBtn.className = 'btn btn-danger';
    removeBtn.style.fontSize = '0.8rem';
    removeBtn.onclick = () => propGroup.remove();
   
    propGroup.appendChild(keyInput);
    propGroup.appendChild(valueInput);
    propGroup.appendChild(removeBtn);
    customProps.appendChild(propGroup);
}
// Clear custom properties
function clearCustomProps() {
    customProps.innerHTML = '';
    customPropCount = 0;
}
// Generate schema from form data
function generateSchema() {
    const schemaType = schemaTypeSelect.value;
    const fields = schemaFields[schemaType];
    const data = {};
   
    // Collect form data
    let hasRequiredFields = true;
    fields.forEach(field => {
        const input = document.getElementById(field.name);
        const value = input.value.trim();
       
        if (field.required && !value) {
            hasRequiredFields = false;
            input.style.borderColor = '#F44336';
        } else {
            input.style.borderColor = '';
            if (value) {
                data[field.name] = value;
            }
        }
    });
   
    if (!hasRequiredFields) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }
   
    // Generate base schema
    const generator = schemaGenerators[schemaType];
    currentSchema = generator(data);
   
    // Collect and add custom properties
    for (let i = 1; i <= customPropCount; i++) {
        const keyEl = document.getElementById(`customKey${i}`);
        const valueEl = document.getElementById(`customValue${i}`);
        if (keyEl && valueEl) {
            const key = keyEl.value.trim();
            const value = valueEl.value.trim();
            if (key && value) {
                try {
                    // Attempt to parse value as JSON for complex values (e.g., arrays/objects)
                    const parsedValue = JSON.parse(value);
                    currentSchema[key] = parsedValue;
                } catch {
                    // Fallback to string
                    currentSchema[key] = value;
                }
            }
        }
    }
   
    // Display schema
    schemaOutput.textContent = JSON.stringify(currentSchema, null, 2);
   
    // Update validation status
    validationStatus.textContent = '✓ Valid Schema (with custom props)';
    validationStatus.className = 'validation-status valid';
}
// Clear form
function clearForm() {
    dynamicFields.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
        input.style.borderColor = '';
    });
    clearCustomProps();
    schemaOutput.textContent = '// Your generated schema will appear here...';
    validationStatus.textContent = '';
    validationStatus.className = 'validation-status';
    currentSchema = null;
}
// Copy to clipboard
function copyToClipboard() {
    if (!currentSchema) {
        alert('Please generate schema first');
        return;
    }
   
    const schemaText = JSON.stringify(currentSchema, null, 2);
    navigator.clipboard.writeText(schemaText).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy to clipboard');
    });
}
// Download JSON
function downloadJSON() {
    if (!currentSchema) {
        alert('Please generate schema first');
        return;
    }
   
    const schemaText = JSON.stringify(currentSchema, null, 2);
    const blob = new Blob([schemaText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schemaTypeSelect.value.toLowerCase()}-schema.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
           
            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
           
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}
// Event listeners
schemaTypeSelect.addEventListener('change', renderFields);
generateBtn.addEventListener('click', generateSchema);
clearBtn.addEventListener('click', clearForm);
copyBtn.addEventListener('click', copyToClipboard);
downloadBtn.addEventListener('click', downloadJSON);
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFields();
    initFAQ();
});
