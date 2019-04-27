/* eslint-disable sort-keys */
/* eslint-disable no-multi-assign */
// faux database

const tags = exports.tags = [];
tags.push({ "id": 1, "text": "Algebra" });
tags.push({ "id": 2, "text": "Linear Equation" });
tags.push({ "id": 3, "text": "Linear Inequality" });
tags.push({ "id": 4, "text": "logarithm" });
tags.push({ "id": 5, "text": "indices" });
tags.push({ "id": 6, "text": "sequences" });
tags.push({ "id": 7, "text": "arithmetic progression" });

const subjects = exports.subjects = [];
subjects.push({ "id": 1, "name": "Mathematics" });
subjects.push({ "id": 2, "name": "English" });
subjects.push({ "id": 3, "name": "Physics" });
subjects.push({ "id": 4, "name": "Computer Science" });

const contents = exports.contents = [];
contents.push({
    "title": "Algebra",
    "resource_type": "video",
    "tags": [tags[0].id, tags[1].id, tags[2].id],
    "subject_id": subjects[0].id,
    "url": "https://cdn.kastatic.org/ka-youtube-converted/vkhYFml0w6c.mp4/vkhYFml0w6c.mp4#t=0",
});
contents.push({
    "title": "Arithmetic Progression",
    "resource_type": "video",
    "tags": [tags[5].id, tags[6].id],
    "url": "https://cdn.kastatic.org/ka-youtube-converted/_cooC3yG_p0.mp4/_cooC3yG_p0.mp4#t=0",
});
contents.push({
    "title": "Arithmetic Progression",
    "resource_type": "video",
    "tags": ["sequence", "series", "mathematics"],
    "url": "",
});
contents.push({
    "title": "Arithmetic Progression",
    "resource_type": "video",
    "tags": ["sequence", "series", "mathematics"],
    "url": "",
});
contents.push({
    "title": "Arithmetic Progression",
    "resource_type": "video",
    "tags": ["sequence", "series", "mathematics"],
    "url": "",
});
contents.push({
    "title": "Arithmetic Progression",
    "resource_type": "video",
    "tags": ["sequence", "series", "mathematics"],
    "url": "",
});
contents.push({
    "title": "Arithmetic Progression",
    "resource_type": "video",
    "tags": ["sequence", "series", "mathematics"],
    "url": "",
});