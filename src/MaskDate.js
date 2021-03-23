export default function dateMask(d) {
    return (
    [
        {
          length: [1, 2],
          options: Array.from({ length: 12 }, (v, k) => k + 1),
          regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
          placeholder: 'mm',
        },
        { fixed: '/' },
        {
          length: [1, 2],
          options: Array.from(
            {
              length: new Date(2019, parseInt(d.split('/')[0], 10), 0).getDate(),
            },
            (v, k) => k + 1,
          ),
          regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
          placeholder: 'dd',
        },
        { fixed: '/' },
        {
          length: 4,
          options: Array.from({ length: 100 }, (v, k) => 2019 - k),
          regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
          placeholder: 'yyyy',
        },
      ]);
}