type ToolbarOption = (string | { [key: string]: unknown })[];

const toolbarOptions: ToolbarOption[] = [
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],

  ['bold', 'italic', 'underline', 'strike'],

  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],

  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],
];

export default toolbarOptions;