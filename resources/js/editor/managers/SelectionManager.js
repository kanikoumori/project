export class SelectionManager {

    select(block) {
        document.querySelectorAll('.block')
            .forEach(b =>
                b.classList.remove('selected')
            );

        block.classList.add('selected');
    }
}