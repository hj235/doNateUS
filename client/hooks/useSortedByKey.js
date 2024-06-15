export const useSortedByKey = () => { 
    const sortedByKey = (arr, option) => {
        if (option == '') return arr;
        const comparator = (listing1, listing2) => {
            switch(option) {
                case 'title':
                    listing1 = listing1.title;
                    listing2 = listing2.title;
                    break;
                case 'created_at':
                    listing1 = listing1.created_at;
                    listing2 = listing2.created_at;
                    break;
                case 'created_at_desc':
                    const temp = listing1.created_at;
                    listing1 = listing2.created_at;
                    listing2 = temp;
                    break;
                default: // if it reaches here, means invalid option was used
                    return 0;
            }
            // localeCompare compares strings, I'm using it here since mongodb only stores strings
            // and this sorter is intended for listing items
            if (!listing2) {
                return 1;
            } else if (!listing1) {
                return -1;
            } else {
                return listing1.localeCompare(listing2);
            }
        }
        
        return arr.toSorted(comparator);
    }

    return { sortedByKey };
};