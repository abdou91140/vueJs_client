import { ref, computed } from 'vue'

export default function useSearch(data, itemsPerPage, currentPage, searchQuery) {

    const filteredData = computed(() => {
        if (!searchQuery.value) {
            return data.value;
        }

        return data.value.filter(item =>
            item.nom_raison_sociale.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.adresse.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
    const paginatedData = computed(() => {
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.value.slice(startIndex, endIndex);
    });

    return {
        searchQuery,
        filteredData,
        paginatedData
    };
}
